import fs from 'node:fs';
import path from 'node:path';

/**
 * ASC3ND True 7-Daily / 4-Weekly / 3-Monthly Backup Retention Engine
 * Protects certified baseline: asc3nd-community-cuts-20260816-222224.dump
 */
export function evaluateRetention(backupDir, certifiedBaseline = 'asc3nd-community-cuts-20260816-222224.dump') {
  if (!fs.existsSync(backupDir)) {
    return { error: 'backup_dir_not_found', kept: [], pruned: [] };
  }

  const allFiles = fs.readdirSync(backupDir).filter(f => f.endsWith('.dump'));
  const parsed = [];

  for (const f of allFiles) {
    const fullPath = path.join(backupDir, f);
    const isBaseline = (f === certifiedBaseline);

    // Pattern: asc3nd-community-cuts-YYYYMMDD-HHMMSS.dump
    const match = f.match(/asc3nd-community-cuts-(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})\.dump/);
    let date = null;
    let dateStr = '';
    let weekStr = '';
    let monthStr = '';

    if (match) {
      const [_, year, month, day, hour, min, sec] = match;
      date = new Date(Date.UTC(+year, +month - 1, +day, +hour, +min, +sec));
      dateStr = `${year}-${month}-${day}`;
      monthStr = `${year}-${month}`;

      // ISO week string
      const d = new Date(Date.UTC(+year, +month - 1, +day));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      weekStr = `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
    }

    parsed.push({
      filename: f,
      fullPath,
      shaPath: fullPath + '.sha256',
      date,
      dateStr,
      weekStr,
      monthStr,
      isBaseline
    });
  }

  // Sort newest first
  parsed.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

  const keptReasons = new Map();

  // 1. Certified baseline always kept
  for (const item of parsed) {
    if (item.isBaseline) {
      keptReasons.set(item.filename, ['certified_baseline']);
    }
  }

  // 2. Daily generation: 1 per unique date for 7 most recent distinct days
  const dailyDates = new Set();
  for (const item of parsed) {
    if (!item.dateStr) continue;
    if (!dailyDates.has(item.dateStr) && dailyDates.size < 7) {
      dailyDates.add(item.dateStr);
      const existing = keptReasons.get(item.filename) || [];
      existing.push(`daily_${item.dateStr}`);
      keptReasons.set(item.filename, existing);
    }
  }

  // 3. Weekly generation: 1 per unique ISO week for 4 most recent distinct weeks
  const weeklyWeeks = new Set();
  for (const item of parsed) {
    if (!item.weekStr) continue;
    if (!weeklyWeeks.has(item.weekStr) && weeklyWeeks.size < 4) {
      weeklyWeeks.add(item.weekStr);
      const existing = keptReasons.get(item.filename) || [];
      existing.push(`weekly_${item.weekStr}`);
      keptReasons.set(item.filename, existing);
    }
  }

  // 4. Monthly generation: 1 per unique month for 3 most recent distinct months
  const monthlyMonths = new Set();
  for (const item of parsed) {
    if (!item.monthStr) continue;
    if (!monthlyMonths.has(item.monthStr) && monthlyMonths.size < 3) {
      monthlyMonths.add(item.monthStr);
      const existing = keptReasons.get(item.filename) || [];
      existing.push(`monthly_${item.monthStr}`);
      keptReasons.set(item.filename, existing);
    }
  }

  const kept = [];
  const pruned = [];

  for (const item of parsed) {
    if (keptReasons.has(item.filename)) {
      kept.push({
        filename: item.filename,
        reasons: keptReasons.get(item.filename)
      });
    } else {
      pruned.push({
        filename: item.filename,
        fullPath: item.fullPath,
        shaPath: item.shaPath
      });
    }
  }

  return {
    totalFiles: parsed.length,
    kept,
    pruned,
    dailyCount: dailyDates.size,
    weeklyCount: weeklyWeeks.size,
    monthlyCount: monthlyMonths.size
  };
}

export function executePrune(backupDir, isDryRun = true) {
  const res = evaluateRetention(backupDir);
  if (res.error) return res;

  if (!isDryRun) {
    for (const p of res.pruned) {
      if (fs.existsSync(p.fullPath)) fs.unlinkSync(p.fullPath);
      if (fs.existsSync(p.shaPath)) fs.unlinkSync(p.shaPath);
    }
  }

  return {
    isDryRun,
    ...res
  };
}

if (process.argv[1] && process.argv[1].endsWith('retention-prune.mjs')) {
  const dir = process.argv[2] || '/opt/backups/asc3nd/database';
  const dryRun = !process.argv.includes('--apply');
  const result = executePrune(dir, dryRun);
  console.log(JSON.stringify(result, null, 2));
}
