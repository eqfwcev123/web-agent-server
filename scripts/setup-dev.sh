#!/bin/bash

# Web Agent Server Development Setup Script
# This script sets up the development environment for the coding education platform

set -e

echo "🚀 Setting up Web Agent Server Development Environment"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
print_status "Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

# Check if PostgreSQL is running
if ! command -v pg_isready &> /dev/null; then
    print_warning "PostgreSQL tools not found. Make sure PostgreSQL is installed and running."
else
    if pg_isready -q; then
        print_status "PostgreSQL is running"
    else
        print_warning "PostgreSQL is not running. Please start PostgreSQL service."
    fi
fi

# Install dependencies
print_info "Installing dependencies..."
npm install
print_status "Dependencies installed"

# Check if .env file exists
if [ ! -f .env ]; then
    print_info "Creating .env file from .env.example..."
    cp .env.example .env
    print_warning "Please update the .env file with your configuration before proceeding."
    print_info "Key configurations to update:"
    echo "  - Database credentials (DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME)"
    echo "  - JWT_SECRET (generate a secure random string)"
    echo "  - OPENAI_API_KEY (for AI features)"
    echo "  - JUDGE0_API_KEY (for code execution)"
    echo ""
    read -p "Press enter to continue after updating .env file..."
else
    print_status ".env file already exists"
fi

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Database setup
print_info "Setting up database..."

# Check database connection
if command -v psql &> /dev/null; then
    if psql -h "${DB_HOST:-localhost}" -U "${DB_USERNAME:-postgres}" -d "${DB_NAME:-coding_education}" -c '\q' 2>/dev/null; then
        print_status "Database connection successful"
        
        # Run migrations
        print_info "Running database migrations..."
        npm run migration:run
        print_status "Migrations completed"
        
        # Run seeds
        print_info "Seeding database with sample data..."
        npm run seed
        print_status "Database seeded"
    else
        print_warning "Cannot connect to database. Please ensure:"
        echo "  1. PostgreSQL is running"
        echo "  2. Database '${DB_NAME:-coding_education}' exists"
        echo "  3. User '${DB_USERNAME:-postgres}' has access"
        echo "  4. Password is correct in .env file"
        echo ""
        print_info "To create the database manually:"
        echo "  psql -U ${DB_USERNAME:-postgres} -c \"CREATE DATABASE ${DB_NAME:-coding_education};\""
    fi
else
    print_warning "psql not found. Please install PostgreSQL client tools."
fi

# Build the application
print_info "Building the application..."
npm run build
print_status "Application built successfully"

# Run tests
print_info "Running tests..."
if npm test; then
    print_status "All tests passed"
else
    print_warning "Some tests failed. Check the output above."
fi

echo ""
print_status "Development environment setup complete!"
echo ""
print_info "Next steps:"
echo "1. Review and update the .env file with your configuration"
echo "2. Start the development server: npm run start:dev"
echo "3. Visit http://localhost:${PORT:-3000} to access the API"
echo "4. API documentation: http://localhost:${PORT:-3000}/api"
echo ""
print_info "Available commands:"
echo "  npm run start:dev    - Start development server with hot reload"
echo "  npm run start:debug  - Start with debug mode"
echo "  npm run test         - Run tests"
echo "  npm run test:watch   - Run tests in watch mode"
echo "  npm run seed         - Re-seed database"
echo "  npm run migration:run - Run pending migrations"
echo ""
print_info "For more information, see README.md and DEVELOPMENT.md"
