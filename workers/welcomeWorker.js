// src/workers/welcomeWorker.js
import { Worker } from "bullmq";
import redisConnection from "../redis.cjs";
import { WelcomeEmail } from "../services/WelcomeEmail.js";

const welcomeWorker = new Worker(
  "welcomeQueue",
  async (job) => {
    console.log("Processing welcome job:", job.id, job.data);
    await WelcomeEmail(job.data);
  },
  { connection: redisConnection, concurrency: 5 }
);

welcomeWorker.on("completed", (job) => console.log(`Welcome job ${job.id} completed`));
welcomeWorker.on("failed", (job, err) => console.error(`Welcome job ${job.id} failed`, err.message));

export default welcomeWorker;
