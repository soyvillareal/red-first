module.exports = {
  apps: [
    {
      name: 'red-first',
      script: 'npm',
      args: 'start',
      interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      exec_mode: 'cluster',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
