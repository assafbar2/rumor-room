import fs from 'node:fs';
import yaml from 'js-yaml';

const cloudBuildText = fs.readFileSync('cloudbuild.yaml', 'utf8');
const workflowText = fs.readFileSync('.github/workflows/ci.yml', 'utf8');

yaml.load(cloudBuildText);
yaml.load(workflowText);

const requiredCloudBuildFragments = [
  'INVESTIGATION_MODE=live',
  'APP_ENV=production',
  'GOOGLE_GENAI_USE_ENTERPRISE=true',
  'PARALLEL_API_KEY=parallel-api-key:latest',
  'rumor-room-runtime@${PROJECT_ID}.iam.gserviceaccount.com',
  '${BUILD_ID}',
];

for (const fragment of requiredCloudBuildFragments) {
  if (!cloudBuildText.includes(fragment)) {
    throw new Error(`cloudbuild.yaml is missing required production fragment: ${fragment}`);
  }
}

for (const command of ['npm audit', 'npm run check', 'npm run test:e2e', 'docker build']) {
  if (!workflowText.includes(command)) {
    throw new Error(`CI workflow is missing required command: ${command}`);
  }
}

console.log('deployment config: YAML and required fail-closed settings validated');
