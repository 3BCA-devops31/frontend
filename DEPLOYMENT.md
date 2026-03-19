# Deployment Runbook

This repo supports two Azure deployment workflows.

## Primary (recommended)

Workflow: `.github/workflows/main_dietfrontend.yml`

Purpose: Build Vite frontend and deploy static output (`dist`) to Azure App Service (`dietfrontend`).

Trigger:
- Push to `main`
- Manual (`workflow_dispatch`)

Required GitHub secrets (already used by this workflow):
- `AZUREAPPSERVICE_CLIENTID_9FB7D01F462744FA8EE9903F9ACCF794`
- `AZUREAPPSERVICE_TENANTID_25766BE5058D47F2BD65525B561DDF30`
- `AZUREAPPSERVICE_SUBSCRIPTIONID_5353E6C33D7544E3BA87B8A3664D6EEC`

Behavior:
- Runs `npm ci`, `npm run build`, `npm run test --if-present`
- Uploads `dist` artifact
- Deploys artifact to Azure Web App `dietfrontend`
- Uses startup command for SPA routing:
  - `pm2 serve /home/site/wwwroot --no-daemon --spa`
- Runs a non-blocking smoke check against:
  - `https://dietfrontend.azurewebsites.net`

## Secondary (manual fallback)

Workflow: `.github/workflows/azure-deploy.yml`

Purpose: Build and deploy Docker image to Azure App Service.

Trigger:
- Manual only (`workflow_dispatch`)

Use this only if you intentionally want container-based deployment.

Required secrets for this fallback path:
- `AZURE_WEBAPP_NAME`
- `AZURE_WEBAPP_PUBLISH_PROFILE`
- `GHCR_USERNAME`
- `GHCR_PAT`

## Verification after deploy

1. Open `https://dietfrontend.azurewebsites.net`
2. Hard refresh (`Ctrl+F5`)
3. If page does not update, restart App Service once in Azure Portal
4. Check App Service `Log stream` for errors
