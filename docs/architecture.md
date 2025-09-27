# Insync Architecture Documentation

## Overview
Insync is a microservices-based application for managing calendars, workflows, and notifications.

## Architecture

### Frontend
- **Technology**: Next.js with TypeScript and Tailwind CSS
- **Location**: `frontend/`
- **Port**: 3000

### Microservices

#### User Service
- **Purpose**: Authentication and user management
- **Technology**: Go with Gorilla Mux
- **Location**: `services/user-service/`
- **Port**: 8080
- **Features**: JWT authentication, user profiles

#### Calendar Service
- **Purpose**: Event scheduling and calendar management
- **Technology**: Go with Gorilla Mux
- **Location**: `services/calendar-service/`
- **Port**: 8081
- **Features**: Event CRUD, calendar integration

#### Workflow Service
- **Purpose**: Integrations and automation
- **Technology**: Go with Gorilla Mux
- **Location**: `services/workflow-service/`
- **Port**: 8082
- **Features**: Third-party integrations, automation rules

#### Notification Service
- **Purpose**: Email/SMS/Slack reminders
- **Technology**: Go with Gorilla Mux
- **Location**: `services/notification-service/`
- **Port**: 8083
- **Features**: Multi-channel notifications

### API Gateway
- **Purpose**: Request routing and load balancing
- **Technology**: Go with Gorilla Mux
- **Location**: `gateway/`
- **Port**: 8084
- **Features**: Service discovery, request routing

### Infrastructure

#### Kubernetes
- **Location**: `k8s/`
- **Manifests**: Deployment, Service, and Ingress configurations
- **Ingress**: NGINX-based routing

#### Docker
- **Location**: `docker/`
- **Files**: Dockerfiles for each service

#### Scripts
- **Location**: `scripts/`
- **Purpose**: Database migrations and setup automation

## Getting Started

1. Run setup script: `./scripts/setup.sh`
2. Start services individually or use Kubernetes manifests
3. Access frontend at `http://localhost:3000`
4. API endpoints available through gateway at `http://localhost:8084`
