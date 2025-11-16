// monitor.cjs
const express = require('express');
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const emailQueue = require("../queues/welcomeQueue.cjs");

const server = express();
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});

server.use('/admin/queues', serverAdapter.getRouter());

server.listen(3001, () => {
  console.log('Bull Board running on port 3001');
});
