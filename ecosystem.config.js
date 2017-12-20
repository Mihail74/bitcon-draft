module.exports = {
  apps: [
    {
      name: 'bitcoin-experiment',
      script: 'bin/www',
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
