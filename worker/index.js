/*
    House the host name and port required for connecting to
    redis
*/
const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // if you ever lose connection to redis server
    // attempt to reconnect every 1 second
    retry_strategy: () => 1000 
});

// subscription
const sub = redisClient.duplicate();

const fib = (index) => {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
};

// Every time we get a new message, run the callback function
// message is the index value
sub.on('message', (channel, message) => {
    // insert into a hash of values
    redisClient.hset('values', message, fib(parseInt(message)));
});

// Every time a value is inserted into redis, calculate the fibonacci number
sub.subscribe('insert')