
# Building a Scalable Angular Application with .NET Backend and Nginx Reverse Proxy

This repository contains the source code for a full-stack web application built with Angular on the frontend and ASP.NET Core on the backend. The application is containerized using Docker, and Nginx is used as a reverse proxy to efficiently route requests between the frontend and backend.

## Table of Contents

- [Building a Scalable Angular Application with .NET Backend and Nginx Reverse Proxy](#building-a-scalable-angular-application-with-net-backend-and-nginx-reverse-proxy)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)
    - [Set Up the Angular Frontend](#set-up-the-angular-frontend)
    - [Set Up the .NET Backend](#set-up-the-net-backend)
    - [Run the Application with Docker Compose](#run-the-application-with-docker-compose)
  - [Application Architecture](#application-architecture)
    - [Angular Frontend](#angular-frontend)
    - [.NET Backend](#net-backend)
    - [Nginx Reverse Proxy](#nginx-reverse-proxy)
  - [Configuration Details](#configuration-details)
    - [Nginx Configuration](#nginx-configuration)
    - [CORS Configuration](#cors-configuration)
  - [Running the Application](#running-the-application)
    - [Accessing the Application](#accessing-the-application)
    - [API Endpoints](#api-endpoints)
  - [Connecting and Contributing](#connecting-and-contributing)
  - [License](#license)
  - [Hashtags](#hashtags)

## Introduction

This project demonstrates how to build and deploy a scalable web application using Angular for the frontend, .NET Core for the backend, and Nginx as a reverse proxy. The application is fully containerized using Docker, allowing it to be easily deployed and managed in various environments.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (v20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.29 or later)
- [Node.js](https://nodejs.org/) (v14 or later)
- [Angular CLI](https://angular.io/cli) (v12 or later)
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)

## Getting Started

### Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/b3r3ch1t/B3r3ch1tAngularSample.git
```

### Set Up the Angular Frontend

Navigate to the `angular-frontend` directory and install the dependencies:

```bash
cd angular-frontend
npm install
```

### Set Up the .NET Backend

Navigate to the `MyAppBackend` directory and restore the .NET dependencies:

```bash
cd MyAppBackend
dotnet restore
```

### Run the Application with Docker Compose

To build and run the entire application (frontend, backend, and Nginx proxy), use Docker Compose:

```bash
docker-compose up --build
```

This command will build the Docker images for both the frontend and backend, set up the Nginx reverse proxy, and start all the containers.

## Application Architecture

### Angular Frontend

The frontend is built with Angular and uses the Angular CLI for development and build tasks. The application is served by Nginx in the Docker container, with Nginx handling the routing of API requests to the backend.

### .NET Backend

The backend is built with ASP.NET Core Minimal API and provides RESTful endpoints for the frontend. The API includes a simple `WeatherForecast` endpoint as a demonstration.

### Nginx Reverse Proxy

Nginx acts as a reverse proxy, routing requests from the Angular frontend to the .NET backend. The Nginx configuration file (`nginx.conf`) is mapped to the container using a Docker volume, allowing for easy configuration adjustments.

## Configuration Details

### Nginx Configuration

The Nginx configuration (`nginx.conf`) is designed to handle routing for the Angular application and proxy API requests to the backend:

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;

    server {
        listen 80;

        location /api {
            proxy_pass http://myappbackend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
        }

        error_page 404 /404.html;
        location = /40x.html {
        }

        location = /50x.html {
        }
    }
}
```

### CORS Configuration

The .NET backend has CORS configured to allow requests from the Angular frontend running on `http://localhost` and `http://localhost:4200`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder =>
        {
            builder.WithOrigins("http://localhost", "http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
```

This configuration ensures that the frontend can make API requests to the backend without running into CORS issues.

## Running the Application

### Accessing the Application

Once the Docker containers are running, you can access the Angular application by navigating to `http://localhost` in your web browser.

### API Endpoints

The application includes a simple `WeatherForecast` API endpoint, which can be accessed at `http://localhost/api/weatherforecast`. This endpoint returns a list of weather forecasts as a JSON array.

## Connecting and Contributing

If you found this project helpful or if you have any questions, feel free to connect and contribute to the ongoing development. Whether you're refining your current projects or embarking on new ventures, your contributions help evolve the practices that drive modern web development.

[Connect with me on LinkedIn](https://www.linkedin.com/in/anderson-meneses/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Hashtags

#Angular #DotNetCore #Nginx #Docker #DockerCompose #FullStackDevelopment #WebDevelopment #SoftwareEngineering #OpenSource
