FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files (safe, no glob)
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# Install dependencies
RUN npm ci

# Copy only required source files
COPY src ./src
COPY public ./public
COPY vite.config.* ./
COPY tsconfig*.json ./
COPY index.html ./

# Build frontend
RUN npm run build
