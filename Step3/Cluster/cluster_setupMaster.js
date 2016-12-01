
// cluster.setupMaster([settings])
// 该方法用来改变默认的fork选项，这些设置会出现在cluster.settings中
// 改变后的结果只会出现在新fork的worker中，不会改变之前fork的结果

const cluster = require('cluster');
cluster.setupMaster({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true
});
cluster.fork(); // https worker
cluster.setupMaster({
  exec: 'worker.js',
  args: ['--use', 'http']
});
cluster.fork(); // http worker