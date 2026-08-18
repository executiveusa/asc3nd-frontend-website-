#!/usr/bin/env node
import { probeHttp } from '../monitoring/asc3nd-monitor.mjs';
import { generateRollbackPlan } from './failover-controller.mjs';

async function runRollbackPreflight() {
  console.log('=== ASC3ND ROLLBACK PREFLIGHT INSPECTION ===');
  console.log('Inspecting primary Vercel origin endpoints...');

  const plan = generateRollbackPlan();
  console.log('Rollback Plan Specification:');
  console.log(JSON.stringify(plan, null, 2));
}

runRollbackPreflight();
