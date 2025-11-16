import { Worker } from "bullmq";
import redisConnection from "../redis.cjs";
import { ReferralEmail } from "../services/ReferralEmail.js";

const referralWorker = new Worker(
  "referralQueue",
  async (job) => {
    console.log("Processing referral job:", job.id, job.data);
    await ReferralEmail(job.data);
  },
  { connection: redisConnection, concurrency: 5 }
);

referralWorker.on("completed", (job) => console.log(`Referral job ${job.id} completed`));
referralWorker.on("failed", (job, err) => console.error(`Referral job ${job.id} failed`, err.message));

export default referralWorker;
