module.exports = {
  apps: [
    {
      name: "api-server",
      script: "server.js",
      watch: false,
      instances: 1
    },
    {
      name: "email-worker",
      script: "workers/emailWorker.js",
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
