#!/bin/bash

# Production verification script for FeeLens
# This script checks if the application is ready for Vercel deployment

set -e  # Stop on error

echo "🚀 FeeLens - Production Verification"
echo "======================================"
echo ""

# Colors for messages
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to display errors
error_exit() {
    echo -e "${RED}❌ Error: $1${NC}" 1>&2
    exit 1
}

# Function to display success messages
success_msg() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to display warnings
warning_msg() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "📦 Step 1/5: Installing dependencies"
echo "------------------------------------"
if npm ci --quiet 2>/dev/null || npm install --quiet; then
    success_msg "Dependencies installed"
else
    error_exit "Failed to install dependencies"
fi
echo ""

echo "🔍 Step 2/5: Running linter"
echo "---------------------------"
if npm run lint; then
    success_msg "Linting passed"
else
    error_exit "Linting failed. Fix errors before continuing."
fi
echo ""

echo "🧪 Step 3/5: Running tests"
echo "--------------------------"
if npm run test; then
    success_msg "Tests passed"
else
    error_exit "Tests failed. Fix tests before continuing."
fi
echo ""

echo "🏗️  Step 4/5: Production build"
echo "------------------------------"
if npm run build; then
    success_msg "Production build successful"
else
    error_exit "Build failed. Application is not ready for production."
fi
echo ""

echo "📊 Step 5/5: Final checks"
echo "-------------------------"

# Check if .next folder exists
if [ -d ".next" ]; then
    success_msg ".next folder created"
else
    error_exit ".next folder was not created"
fi

# Check build size
if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next | cut -f1)
    echo "   Build size: $BUILD_SIZE"
fi

echo ""
echo "======================================"
echo -e "${GREEN}🎉 SUCCESS! Application is ready for production!${NC}"
echo ""
echo "Next steps:"
echo "  1. Commit your changes: git add . && git commit -m 'Ready for production'"
echo "  2. Push to Vercel: git push"
echo "  3. Verify deployment on Vercel"
echo ""
echo "======================================"

