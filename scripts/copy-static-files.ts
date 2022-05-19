const fs = require('fs');
const path = require('path');

const STATIC_PATH = path.join(__dirname, '..', 'static');
const DIST_PATH = path.join(__dirname, '..', 'dist', 'alx-printer');
console.log(STATIC_PATH);
console.log(DIST_PATH);
for(const file of fs.readdirSync(STATIC_PATH)) {
  fs.copyFileSync(path.join(STATIC_PATH, file), path.join(DIST_PATH, file));
}
