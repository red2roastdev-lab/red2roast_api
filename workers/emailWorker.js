// src/workers/emailWorker.js
import { Worker } from "bullmq";
import redisConnection from "../redis.cjs";
import { WelcomeEmail } from "../services/WelcomeEmail.js";
import { ReferralEmail } from "../services/ReferralEmail.js";

const worker = new Worker(
    "emailQueue",
    async (job) => {
        console.log("Processing job:", job.id, job.name, job.data);

        if (job.name === "welcome") {
            try {
                await WelcomeEmail(job.data);
            } catch (err) {
                console.error(`Welcome email job ${job.id} failed:`, err);
                throw err;
            }
        }

        if (job.name === "referral") {
            try {
                await ReferralEmail(job.data);
            } catch (err) {
                console.error(`Welcome email job ${job.id} failed:`, err);
                throw err;
            }
        }

        return { success: true };
    },
    { 
        connection: redisConnection,
        concurrency: 5 //allow multiple emails in parallel
    
    }
);

worker.on("completed", (job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job, err) =>
    console.error(`Job ${job.id} failed`, err.message)
);

export default worker;
