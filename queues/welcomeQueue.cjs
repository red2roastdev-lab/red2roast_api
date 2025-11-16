// emailWorker.cjs
const { Queue } = require("bullmq");
const redisConnection = require("../redis.cjs"); // make sure redis.js is also CJS

const welcomeQueue = new Queue("welcomeQueue", {
    connection: redisConnection, // bullmq expects `connection` property
});

module.exports = welcomeQueue;
