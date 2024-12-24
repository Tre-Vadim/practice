const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// creat folders
fs.mkdirSync(path.join(__dirname, 'files', 'files1', 'files2'), { recursive: true });
console.log('start');
fs.mkdir(path.join(__dirname, 'files'), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('The folders were created');
  }
});
console.log('end');

// delete folder
fs.rmdir(path.resolve(__dirname, 'files'), (err) => {
  if (err) {
    throw err;
  }
});

// write file
fs.writeFile(path.resolve(__dirname, 'users.txt'), 'User 1, User 2, User 3, User 4', (err) => {
    if (err) {
      throw err;
    }
    console.log('The file was created');
});

// update file
fs.writeFile(path.resolve(__dirname, 'users.txt'), 'User 1, User 2, User 3, User 4', (err) => {
  if (err) {
    throw err;
  }
  console.log('The file was created');
  fs.appendFile(path.resolve(__dirname, 'users.txt'), 'THE END', (err) => {
    if (err) {
      throw err;
    }
  })
});
// or
fsPromises.writeFile(path.resolve(__dirname, 'users.txt'), 'THE Begin')
  .then(() => fsPromises.appendFile(path.resolve(__dirname, 'users.txt'), 'The End'))

// open
fs.open(path.resolve(__dirname, 'users.txt'), (err) => {
  if (err) throw err;
})

// read
fs.readFile(path.resolve(__dirname, 'users.txt'), { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log('data', data);
})

// delete
fs.rm(path.resolve(__dirname, 'users.txt'), (err) => {
  if (err) throw err;
  console.log('The file was deleted');
})

// practice
const text = process.env.TEXT || '';
fsPromises.writeFile(path.resolve(__dirname, 'text.txt'), text)
  .then(() => fsPromises.readFile(path.resolve(__dirname, 'text.txt'), { encoding: 'utf8' }))
  .then(data => data.split(' ').length)
  .then(count => fsPromises.writeFile(path.resolve(__dirname, 'count.txt'), `${count}`, { encoding: 'utf8' }))
  .then(() => fsPromises.rm(path.resolve(__dirname, 'text.txt')))
  .catch(err => console.log(err));
