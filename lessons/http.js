const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/users') {
    return res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  }
  if (req.url === '/posts') {
    return res.end(JSON.stringify([{ id: 1, name: 'Post one' }]));
  }
  res.end(req.url);
});

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
})
