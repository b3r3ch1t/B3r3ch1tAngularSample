# Step 1: Build the Angular application
FROM node:22.7.0-alpine3.20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Serve the Angular application with Nginx
FROM nginx:alpine3.20
COPY --from=build /app/dist/angular-frontend /usr/share/nginx/html
