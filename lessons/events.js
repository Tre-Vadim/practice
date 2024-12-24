const Emitter = require('events');
const dotenv = require('dotenv');
dotenv.config();

const emitter = new Emitter();

emitter.on('message', (...args) => {
  console.log('args', args);
})

// only one time
emitter.once('message', (...args) => {
  console.log('args', args);
})

// remove listeners
emitter.removeAllListeners('message', () => {});
emitter.removeListener('message', () => {});

const message = process.env.MESSAGE || '';

if (message) {
  emitter.emit('message', message, 123);
} else {
  emitter.emit('message', `You didn't provide a message`);
}
