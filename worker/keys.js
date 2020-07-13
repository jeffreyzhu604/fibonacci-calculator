/*
    Everytime we connect to redis, we're going to look for the
    host name and the port we're supposed to connect to it from
*/
module.exports = {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
};