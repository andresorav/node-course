console.log('Starting app');

setTimeout(() => {
    console.log('Timeout fired');
}, 2000);

setTimeout(() => {
    console.log('0 timeout fired');
}, 0);

console.log('Finishing app');
