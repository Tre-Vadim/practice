#!/usr/bin/env bash

rm -fr dist/libs/typeorm
nest build typeorm
node --require ts-node/register node_modules/typeorm/cli.js migration:generate -p -d src/db/data-source.ts src/db/migrations/$1
