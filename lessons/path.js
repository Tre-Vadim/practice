const path = require('path');

// join
console.log('path.join', path.join(__dirname, 'first', 'second', 'third'));
console.log('path.join', path.join(__dirname, '..', 'second', 'third'));

// resolve
console.log('absolute path', path.resolve('first', 'second', 'third'));

// parse
const fullpath = path.resolve('first', 'second', 'third.js');
console.log('parsing', path.parse(fullpath));

// other
console.log('OS separator', path.sep);
console.log('check absolute path', path.isAbsolute(fullpath));
console.log('check absolute path', path.isAbsolute(path.join('first', 'second', 'third')));
console.log('file name', path.basename(fullpath));
console.log('extension', path.extname(fullpath));

// urls
const siteUrl = 'http://localhost:8080/users?id=453';
const url = new URL(siteUrl);
console.log('url', url);
