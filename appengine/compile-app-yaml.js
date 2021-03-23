#!/usr/bin/env node

const fs = require('fs');

const template = fs.readFileSync('app.yaml.template').toString();
let content = template;

for (const match of template.matchAll(/\${{([A-Z_]*)}}/g)) {
  const envName = `${match[1]}`;
  content = content.replace(match[0], `'${process.env[envName]}'`);
}

fs.writeFileSync('app.yaml', content);

