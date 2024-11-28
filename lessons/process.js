// work with envs
const dotenv = require('dotenv');
dotenv.config();

console.log(process.pid);
console.log('process.env.PORT', process.env.PORT);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// work with args
console.log('process.args', process.argv);

// work with exit
if (Math.random() > 0.5) {
  while (true) {}
} else {
  console.log('Stop');
  process.exit();
}
