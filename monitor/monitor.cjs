// monitor.cjs
const express = require('express');
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');

const welcomeQueue = require("../queues/welcomeQueue.cjs");
const referralQueue = require("../queues/referralQueue.cjs");

const server = express();
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');


// Create your queues
const welcomeQueue = new Queue("welcomeQueue", {
  connection: { host: "127.0.0.1", port: 6379 }
});

const referralQueue = new Queue("referralQueue", {
  connection: { host: "127.0.0.1", port: 6379 }
});

// Register them both
createBullBoard({
  queues: [
    new BullMQAdapter(welcomeQueue),
    new BullMQAdapter(referralQueue),
  ],
  serverAdapter,
});

server.use('/admin/queues', serverAdapter.getRouter());

server.listen(3001, () => {
  console.log('Bull Board running on port 3001');
});
