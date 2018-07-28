var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
       }, 1500)
    });
};

asyncAdd(3, 1).then((result) => {
    return asyncAdd(result, 3);
}).then((result) => {
    console.log('Result: %s', result);
}).catch((errorMessage) => {
    console.log('Got error: %s', errorMessage);
});

//
//
// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('Resolve! It works!');
//         reject('Unable to fulfill the promise');
//     }, 2500);
// });
//
// somePromise.then((message) => {
//     console.log('Success!', message);
// }, (errorMessage) => {
//     console.log('Error: %s', errorMessage);
// });
