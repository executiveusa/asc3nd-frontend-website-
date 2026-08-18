import fs from 'node:fs';
import path from 'node:path';

const LOG_DIR = process.env.MONITOR_LOG_DIR || '/opt/monitoring/asc3nd';
const ALERT_STATE_FILE = path.join(LOG_DIR, 'alert-dispatch-state.json');
const ALERTS_LOG = path.join(LOG_DIR, 'alerts.log');
const COOLDOWN_MS = 15 * 60 * 1000; // 15-minute alert cooldown for duplicate alerts

function loadAlertState() {
  if (fs.existsSync(ALERT_STATE_FILE)) {
    try { return JSON.parse(fs.readFileSync(ALERT_STATE_FILE, 'utf8')); } catch {}
  }
  return { lastDispatched: {} };
}

function saveAlertState(state) {
  fs.writeFileSync(ALERT_STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

/**
 * Dispatch alert to real external channels.
 * Rule: dispatched is true ONLY if at least one external channel accepted the alert with HTTP 2xx.
 */
export async function dispatchAlert(alert) {
  const state = loadAlertState();
  const alertKey = `${alert.target}:${alert.error || alert.level}`;
  const now = Date.now();
  const lastTime = state.lastDispatched[alertKey] || 0;

  if (now - lastTime < COOLDOWN_MS && !alert.force) {
    return { dispatched: false, reason: 'cooldown_suppressed', channel: 'none' };
  }

  // Always record to local audit log
  const logLine = `[${alert.timestamp || new Date().toISOString()}] [${alert.level}] [${alert.target}] ${alert.error || ''} (failures: ${alert.failures || 1})\n`;
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFileSync(ALERTS_LOG, logLine, 'utf8');

  const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
  const chatId = process.env.TELEGRAM_CHAT_ID || '';
  const webhookUrl = process.env.COOLIFY_WEBHOOK_URL || process.env.ALERT_WEBHOOK_URL || '';

  const successfulChannels = [];
  const errors = [];

  // 1. Telegram Dispatch
  if (botToken && chatId) {
    try {
      const msg = `🚨 *ASC3ND SYSTEM ALERT* 🚨\n\n*Level:* ${alert.level}\n*Target:* ${alert.target}\n*Error:* ${alert.error || 'Check failed'}\n*Timestamp:* ${alert.timestamp || new Date().toISOString()}`;
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' })
      });
      if (res.ok) {
        successfulChannels.push('telegram');
      } else {
        errors.push(`telegram_http_${res.status}`);
      }
    } catch (e) {
      errors.push(`telegram_error:${e.message}`);
    }
  }

  // 2. Webhook Dispatch
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app: 'asc3nd',
          level: alert.level,
          target: alert.target,
          error: alert.error,
          timestamp: alert.timestamp || new Date().toISOString()
        })
      });
      if (res.ok) {
        successfulChannels.push('webhook');
      } else {
        errors.push(`webhook_http_${res.status}`);
      }
    } catch (e) {
      errors.push(`webhook_error:${e.message}`);
    }
  }

  // Evaluate truthfulness of dispatch:
  // Console logging alone does NOT count as external delivery.
  if (successfulChannels.length > 0) {
    // Only advance cooldown when actual external delivery succeeded
    state.lastDispatched[alertKey] = now;
    saveAlertState(state);
    return {
      dispatched: true,
      channel: successfulChannels.join('+'),
      key: alertKey
    };
  }

  // No external channel configured or all external channels failed
  const reason = (errors.length > 0)
    ? `external_delivery_failed:${errors.join(',')}`
    : 'no_external_channel_configured';

  return {
    dispatched: false,
    reason,
    channel: 'none',
    key: alertKey
  };
}
