const { Queue } = require("bullmq");
const redisConnection = require("../redis.cjs"); // make sure redis.js is also CJS

const referralQueue = new Queue("referralQueue", {
    connection: redisConnection, // bullmq expects `connection` property
});

module.exports = referralQueue;
