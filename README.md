
# Diet & Lifestyle Tracker – Frontend

Project ID: dietandlifestyle

Application Type: Single Page Application (SPA)

Purpose: User-friendly interface for tracking daily meals, calorie intake, and exercise activities

## Tech Stack

React.js

Vite (fast build and development tool)

JavaScript (ES6+)

HTML5 & CSS3

Node.js & npm

Docker

SonarCloud (code quality & coverage analysis)

## Key Features

Add, edit, and delete meal records

Track exercise activities and duration

Display daily diet and exercise summaries

Responsive UI for desktop and mobile

Form validation and controlled inputs

Component-based architecture for reusability

Clean state management using React hooks

## Application Structure

Reusable Components for forms and lists

Separation of concerns between UI and logic

Props-based data flow

Organized folder structure for scalability

## Testing & Code Quality

Unit testing using Vitest

Code coverage enforcement via SonarCloud Quality Gate

Accessibility and maintainability checks

Continuous integration with GitHub Actions

## Docker Support

Frontend application containerized using Docker

Ensures consistent builds across environments

docker build -t dietandlifestyle-frontend .
docker run -p 5173:5173 dietandlifestyle-frontend

## Development & Run

Development server runs on port 5173

Fast hot module replacement (HMR) with Vite

Production-ready optimized build

##<img width="1920" height="1080" alt="Screenshot 2026-02-09 123744" src="https://github.com/user-attachments/assets/9daf70cc-cf24-4343-ba30-b282e4fc25be" />
<img width="1024" height="207" alt="1000043557" src="https://github.com/user-attachments/assets/8db10e8b-7938-4585-8c36-7bca879c2673" />
<img width="1920" height="1080" alt="Screenshot 2026-02-09 104905" src="https://github.com/user-attachments/assets/0b30c642-d18a-4d2e-8158-c4b9363227ff" />
 Future Improvements

Authentication and user profiles

Dashboard with charts and analytics

Improved accessibility (ARIA enhancements)

Enhanced UI/UX design

Progressive Web App (PWA) support
[diet and lifestyle ppt.pptx](https://github.com/user-attachments/files/25225483/diet.and.lifestyle.ppt.pptx)

## Azure Deployment Procedure (Container + GitHub Actions)

This project deploys the frontend to Azure App Service using a Docker container and GitHub Actions.

### 1) Prerequisites

- Azure Web App (Linux, container-based) already created.
- Repository contains:
	- `Dockerfile` at repo root
	- `nginx.conf` with SPA fallback
	- `.github/workflows/azure-deploy.yml`

### 2) Configure GitHub Secrets

In GitHub repo -> `Settings` -> `Secrets and variables` -> `Actions`, add these secrets:

- `AZURE_WEBAPP_NAME`: your App Service name
- `AZURE_WEBAPP_PUBLISH_PROFILE`: full publish profile XML from Azure portal
- `GHCR_USERNAME`: your GitHub username
- `GHCR_PAT`: GitHub Personal Access Token (at least `read:packages`; add `repo` if private)

### 3) Get Publish Profile

Azure Portal -> Web App -> `Overview` -> `Get publish profile`.

Copy the downloaded XML content into `AZURE_WEBAPP_PUBLISH_PROFILE` secret.

### 4) Deploy

- Push changes to `main`, or
- Run workflow manually: GitHub -> `Actions` -> `Build and Deploy Frontend to Azure` -> `Run workflow`

Workflow steps:

1. Build Docker image from root `Dockerfile`
2. Push image to `ghcr.io`
3. Configure Azure App Service container registry settings
4. Deploy the pushed image to Azure Web App

### 5) Verify

- Wait 1 to 3 minutes after workflow success.
- Open your Azure URL and hard refresh (`Ctrl+F5`).
- If still not loading, restart the Web App once from Azure portal and retry.

### Notes

- The app is served by Nginx on port `80` inside the container.
- SPA routes are handled by `try_files $uri $uri/ /index.html` in `nginx.conf`.


