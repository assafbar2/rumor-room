# Google Cloud Deployment

Current verified deployment: `https://rumor-room-dpq2d26l7q-uc.a.run.app` on revision `rumor-room-00005-8zc`.

The hosted submission runs one Cloud Run service containing the React client and the Google ADK server. Gemini runs on Vertex AI. The Parallel key stays in Secret Manager.

Creating cloud resources and deploying require explicit approval under this repository's instructions. The initial deployment received that approval and completed on August 29, 2026.

## Prerequisites

- A Google Cloud project with billing enabled.
- `gcloud` installed and authenticated.
- A Parallel API key.
- Permission to enable APIs, create IAM roles, create an Artifact Registry repository, create a secret, submit Cloud Build jobs, and deploy Cloud Run.

## One-time project setup

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export RUNTIME_SA="rumor-room-runtime@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud config set project "$PROJECT_ID"

gcloud services enable \
  aiplatform.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  secretmanager.googleapis.com

gcloud artifacts repositories create rumor-room \
  --repository-format=docker \
  --location="$REGION" \
  --description="Rumor Room application images"

gcloud iam service-accounts create rumor-room-runtime \
  --display-name="Rumor Room runtime"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUNTIME_SA}" \
  --role="roles/aiplatform.user"

gcloud secrets create parallel-api-key --replication-policy=automatic
printf '%s' "$PARALLEL_API_KEY" | \
  gcloud secrets versions add parallel-api-key --data-file=-

gcloud secrets add-iam-policy-binding parallel-api-key \
  --member="serviceAccount:${RUNTIME_SA}" \
  --role="roles/secretmanager.secretAccessor"
```

Grant the identity that runs Cloud Build permission to write Artifact Registry images, deploy Cloud Run, and act as the runtime service account. The exact build identity differs between Google Cloud project generations, so inspect the Cloud Build settings before assigning roles.

## Build and deploy

```bash
gcloud builds submit --config cloudbuild.yaml
```

The pipeline:

1. Builds the multi-stage Docker image.
2. Pushes it to Artifact Registry.
3. Deploys a public Cloud Run service.
4. Sets `APP_ENV=production` and `INVESTIGATION_MODE=live`.
5. Mounts the Parallel key from Secret Manager.
6. Configures Gemini 3.7 Flash on Vertex AI in the global location.
7. Runs as the dedicated `rumor-room-runtime` service account.
8. Caps the service at one instance so a session's in-process evidence ledger serves both its investigations and its verdict.

Images are tagged with Cloud Build's guaranteed `BUILD_ID`, so both repository-triggered and manual `gcloud builds submit` deployments produce a valid immutable tag.

## Verify

```bash
SERVICE_URL="$(gcloud run services describe rumor-room \
  --region=us-central1 \
  --format='value(status.url)')"

curl -fsS "${SERVICE_URL}/api/health"
```

Expected shape:

```json
{
  "mode": "live",
  "provider": "gemini-parallel",
  "ready": true,
  "message": "Gemini investigator and Parallel Search are configured."
}
```

Then play one complete case, open every returned receipt, inspect Cloud Run logs, and run the smoke path in `docs/internal/TESTING.md`.

## Rollback

Cloud Run retains revisions. If a deployment regresses:

```bash
gcloud run revisions list --service=rumor-room --region=us-central1
gcloud run services update-traffic rumor-room \
  --region=us-central1 \
  --to-revisions=PREVIOUS_REVISION=100
```

## Secret rotation

Add a new Secret Manager version; do not change source code or commit `.env` files.

```bash
printf '%s' "$NEW_PARALLEL_API_KEY" | \
  gcloud secrets versions add parallel-api-key --data-file=-
```
