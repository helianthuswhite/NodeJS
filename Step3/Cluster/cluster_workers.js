
// cluster.workers
// 一个存储活跃worker对象的哈希表，通过id标识，只在master进程中有效

// Go through all workers
function eachWorker(callback) {
  for (var id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}
eachWorker((worker) => {
  worker.send('big announcement to all workers');
});

