const os = require('os');
const cluster = require('cluster');

console.log('os.platform', os.platform());
console.log('os.arch', os.arch());
console.log('os.cpus', os.cpus());
console.log('cores', os.cpus().length);

const cpus = os.cpus();

if (cluster.isMaster) {
  for (let i = 0; i < cpus.length - 2; i++) {
    const CPUcore = cpus[i];
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`The worker with PID ${worker.process.pid} is killed`);
    cluster.fork();
  });
} else {
  console.log(`The worker with PID: ${process.pid} is running`);

  setInterval(() => {
    console.log(`The worker with PID: ${process.pid} is still working`);
  }, 5000)
}
