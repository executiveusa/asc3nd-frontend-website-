import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const fail = (message, details = {}) => {
  console.error('\nREPOSITORY_BOUNDARY_STOP');
  console.error(message);
  for (const [key, value] of Object.entries(details)) console.error(`${key}: ${value}`);
  process.exit(1);
};

const boundary = readJson('repo-boundary.json');
const lock = readJson('deployment-lock.json');
const pkg = readJson('package.json');
const vercel = readJson('vercel.json');

const checks = [];
const pass = (name, detail) => checks.push({ name, status: 'PASS', detail });

// Check 1: source repository identity.
const githubRepository = process.env.GITHUB_REPOSITORY;
const vercelOwner = process.env.VERCEL_GIT_REPO_OWNER;
const vercelSlug = process.env.VERCEL_GIT_REPO_SLUG;
if (githubRepository && githubRepository !== boundary.repository) {
  fail('Source repository does not match this repository law.', {
    expected: boundary.repository,
    received: githubRepository
  });
}
if (process.env.VERCEL === '1') {
  if (!vercelOwner || !vercelSlug) {
    fail('Vercel repository identity variables are missing; refusing deployment.', {
      expected_owner: lock.allowed_vercel_git_owner,
      expected_repo: lock.allowed_vercel_git_repo_slug
    });
  }
  if (vercelOwner !== lock.allowed_vercel_git_owner || vercelSlug !== lock.allowed_vercel_git_repo_slug) {
    fail('Vercel is building from the wrong Git repository.', {
      expected: `${lock.allowed_vercel_git_owner}/${lock.allowed_vercel_git_repo_slug}`,
      received: `${vercelOwner}/${vercelSlug}`
    });
  }
}
pass('source_repository_identity', githubRepository || `${vercelOwner || 'local'}/${vercelSlug || 'workspace'}`);

// Check 2: package and workspace build identity.
if (pkg.name !== lock.package_name || pkg.name !== boundary.package_name) {
  fail('Package identity does not match the deployment lock.', {
    expected: lock.package_name,
    received: pkg.name
  });
}
if (vercel.buildCommand !== lock.build_command || vercel.outputDirectory !== lock.output_directory) {
  fail('Vercel build target drift detected.', {
    expected_build: lock.build_command,
    received_build: vercel.buildCommand,
    expected_output: lock.output_directory,
    received_output: vercel.outputDirectory
  });
}
pass('workspace_build_identity', `${pkg.name} -> ${vercel.outputDirectory}`);

// Check 3: Vercel project identity.
if (process.env.VERCEL === '1') {
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!productionUrl) {
    fail('VERCEL_PROJECT_PRODUCTION_URL is missing; refusing an unidentifiable Vercel target.');
  }
  if (lock.forbidden_project_production_urls.includes(productionUrl)) {
    fail('This repository is connected to an explicitly forbidden Vercel project.', {
      received: productionUrl
    });
  }
  if (!lock.allowed_project_production_urls.includes(productionUrl)) {
    fail('Vercel project is not allowlisted for this repository and deployment role.', {
      deployment_role: lock.deployment_role,
      received: productionUrl,
      allowed: lock.allowed_project_production_urls.join(', ')
    });
  }
  pass('vercel_project_identity', productionUrl);
} else {
  pass('vercel_project_identity', 'local/non-Vercel execution; target check deferred');
}

console.log('\nASC3ND REPOSITORY + DEPLOYMENT GUARD');
for (const check of checks) console.log(`PASS ${check.name}: ${check.detail}`);
console.log(`PASS deployment_role: ${lock.deployment_role}`);
