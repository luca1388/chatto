const { readFileSync } = require('fs');
const { join } = require('path');
const file = readFileSync(join(__dirname, '../dist', '*.js'), 'utf8');