const { readdirSync } = require('fs');
const { join } = require('path');
const files = readdirSync(join(__dirname, '../dist'));
// const file = readFileSync(join(__dirname, '../dist', ''), 'utf8');