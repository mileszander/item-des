module.exports = {
    apps: [{
      name: 'items-des',
      script: './server/index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-3-18-113-157.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/mvropdoeafposafapso.pem',
        ref: 'origin/hello-world',
        repo: 'https://github.com/home-de-pott/item-des.git',
        path: '/home/ubuntu',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }