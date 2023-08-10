#!/bin/sh

cd $(dirname "$0")
cd ../graphql

rm -rf */*.hooks.tsx
cd ..
cd ..
npx graphql-codegen --config codegen.yml

exec "$@"