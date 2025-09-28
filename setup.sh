#!/bin/bash

# CampusBridge Project Setup Script
# This script automates the setup process for the CampusBridge project

set -e  # Exit on any error

echo "🚀 CampusBridge Project Setup"
echo "================================"

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -lt 16 ]; then
        echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 16 or higher."
        exit 1
    fi
    echo "✅ Node.js version: $NODE_VERSION"
else
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Start MongoDB with Docker
echo "📦 Starting MongoDB database..."
docker-compose up -d

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
sleep 5

# Install server dependencies
echo "📚 Installing server dependencies..."
npm ci

# Install client dependencies
echo "📚 Installing client dependencies..."
cd client
npm ci
cd ..

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🌐 To start the application:"
echo "   Terminal 1: npm run dev          # Start GraphQL server"
echo "   Terminal 2: cd client && npm run dev  # Start React client"
echo ""
echo "📍 Access points:"
echo "   Frontend:  http://localhost:5000"
echo "   GraphQL:   http://localhost:4000/graphql"
echo ""
