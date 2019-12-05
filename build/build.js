const { readFileSync } = require('fs');
const { join } = require('path');
const files = fs.readdirSync(join(__dirname, '../dist'));
// const file = readFileSync(join(__dirname, '../dist', ''), 'utf8');