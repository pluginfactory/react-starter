#!/bin/bash
# this contains the deploy build script for lintinte webapp

echo "Building for deployment"
npm run build
docker build -t careapp/tutable-webapp:latest .
docker push careapp/tutable-webapp:latest