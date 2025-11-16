// redis.cjs
const Redis = require("ioredis");

const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: "",
  maxRetriesPerRequest: null, // required by BullMQ
});

module.exports = redisConnection;
