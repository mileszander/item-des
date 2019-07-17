module.exports = {
    apps: [{
      name: 'items-des',
      script: './server/index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-13-59-33-46.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/jabr.pem',
        ref: 'origin/hello-world',
        repo: 'https://github.com/home-de-pott/item-des.git',
        path: '/home/ubuntu/server',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }