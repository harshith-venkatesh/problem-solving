const asyncTask = function(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${time} ms`);
    }, 1000 * time);
  });
}

const promises = [
    asyncTask(11),
    asyncTask(2),
    asyncTask(13),
    asyncTask(4),
    asyncTask(15),
    asyncTask(6),
    asyncTask(17),
    asyncTask(8),
    asyncTask(19),
    asyncTask(10)
]

const asyncPromiseExecutor = function(promises) {
    promises.reduce((promiseChain, currentPromise) => {
        return promiseChain.then(chainResults =>
            currentPromise.then(currentResult =>
                console.log(currentResult)
            )
        );
    }, Promise.resolve());
}
asyncPromiseExecutor(promises);