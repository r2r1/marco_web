module.exports = {
  apps: [
    {
      name: 'marco-site',
      script: './marco-site/.next/standalone/server.js',
      cwd: '/var/www/marco_web',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
      },
    },
  ],
};
