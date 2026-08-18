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

export async function dispatchAlert(alert) {
  const state = loadAlertState();
  const alertKey = `${alert.target}:${alert.error || alert.level}`;
  const now = Date.now();
  const lastTime = state.lastDispatched[alertKey] || 0;

  if (now - lastTime < COOLDOWN_MS && !alert.force) {
    return { dispatched: false, reason: 'cooldown_suppressed', channel: 'none' };
  }

  const logLine = `[${alert.timestamp || new Date().toISOString()}] [${alert.level}] [${alert.target}] ${alert.error || ''} (failures: ${alert.failures || 1})\n`;
  fs.appendFileSync(ALERTS_LOG, logLine, 'utf8');

  let dispatchedChannel = 'console_log';
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
  const chatId = process.env.TELEGRAM_CHAT_ID || '';
  const webhookUrl = process.env.COOLIFY_WEBHOOK_URL || process.env.ALERT_WEBHOOK_URL || '';

  if (botToken && chatId) {
    try {
      const msg = `🚨 *ASC3ND SYSTEM ALERT* 🚨\n\n*Level:* ${alert.level}\n*Target:* ${alert.target}\n*Error:* ${alert.error || 'Check failed'}\n*Timestamp:* ${alert.timestamp || new Date().toISOString()}`;
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' })
      });
      if (res.ok) dispatchedChannel = 'telegram';
    } catch (e) {
      console.error('Telegram dispatch error:', e.message);
    }
  }

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
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
      dispatchedChannel = (dispatchedChannel === 'console_log') ? 'webhook' : `${dispatchedChannel}+webhook`;
    } catch (e) {
      console.error('Webhook dispatch error:', e.message);
    }
  }

  state.lastDispatched[alertKey] = now;
  saveAlertState(state);

  return { dispatched: true, channel: dispatchedChannel, key: alertKey };
}
