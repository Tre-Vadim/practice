// Readable - for reading
// Writable - for writing
// Duplex - for both
// Transform - the same as duplex but can change during the reading

const fs = require('fs');
const path = require('path');

const text = 'Data 123 \n';

fs.promises.writeFile(path.resolve(__dirname, 'text.txt'), text).then(() => {
  for (let i = 0; i < 40000; i++) {
    fs.promises.appendFile(path.resolve(__dirname, 'text.txt'), text);
  }
})

// read all file
fs.readFile(path.resolve(__dirname, 'text.txt'), (err, data) => {
  if (err) throw err;
  console.log('data', data);
});

// read by streaming
const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), { encoding: 'utf8' });
stream.on('data', (chunk) => {
  console.log('chunk', chunk);
});

stream.on('end', () => console.log('the reading is ended'));
stream.on('open', () => console.log('the reading is opened'));
stream.on('error', (err) => console.log('error', err));

// write by streaming
const writableStream = fs.createWriteStream(path.join(__dirname, 'stream.txt'));
for (let i = 0; i < 20; i++) {
  writableStream.write(i + '\n');
}
writableStream.end();
writableStream.close();
writableStream.destroy();
writableStream.on('error', (err) => {
  console.error(err);
})

// http
const http = require('http');

http.createServer((req, res) => {
  // req - readable stream
  // res - writable stream
  const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));

  // The stream will end reading before a user downloads the file
  stream.on('data', (chunk) => res.write(chunk));
  stream.on('end', () => res.end());
  stream.pipe(res);
})
