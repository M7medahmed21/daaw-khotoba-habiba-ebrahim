#!/bin/bash
set -e

echo "Building the application..."
pnpm --filter @workspace/habiba-ibrahim-invitation build

echo "Preparing output for Vercel..."
mkdir -p .vercel/output/static
cp -r artifacts/habiba-ibrahim-invitation/public/. .vercel/output/static/

echo "Build complete!"

