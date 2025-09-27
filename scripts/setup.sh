#!/bin/bash

# Setup script for insync project

echo "Setting up insync project..."

# Install dependencies for frontend
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build Go services
echo "Building Go services..."
cd services/user-service && go mod tidy && cd ../..
cd services/calendar-service && go mod tidy && cd ../..
cd services/workflow-service && go mod tidy && cd ../..
cd services/notification-service && go mod tidy && cd ../..
cd gateway && go mod tidy && cd ..

echo "Setup completed!"
echo "To start the services:"
echo "  Frontend: cd frontend && npm run dev"
echo "  User Service: cd services/user-service && go run cmd/main.go"
echo "  Calendar Service: cd services/calendar-service && go run main.go"
echo "  Workflow Service: cd services/workflow-service && go run main.go"
echo "  Notification Service: cd services/notification-service && go run main.go"
echo "  Gateway: cd gateway && go run main.go"
