module.exports = {
  apps: [
    {
      name: "api-server",
      script: "server.js",
      watch: false,
      instances: 1
    },
    {
      name: "welcome-email-worker",
      script: "workers/welcomeWorker.js",
      watch: false,
      instances: 1
    },
      {
      name: "referral-email-worker",
      script: "workers/referralWorker.js",
      watch: false,
      instances: 1
    },
    {
      name: "bull-monitor",
      script: "monitor/monitor.cjs",
      watch: false,
      instances: 1
    }
  ]
};
