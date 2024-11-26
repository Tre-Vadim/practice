#!/usr/bin/env bash

nest build typeorm
node --require ts-node/register node_modules/typeorm/cli.js migration:revert -d src/db/data-source.ts
