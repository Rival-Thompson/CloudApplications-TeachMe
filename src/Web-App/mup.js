module.exports = {
  servers: {
    one: {
      host: '54.71.205.83',
      username: 'ubuntu',
      pem: './awsserver.pem'
      // password:
      // or leave blank for mup authenticate from ssh-agent
    }
  },
  meteor: {
    dockerImage: 'abernix/meteord:base',
    name: 'Web-App',
    path: '.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 80,
      ROOT_URL: 'http://teachmeapp.ga/',
      MONGO_URL: 'mongodb://server:aws@ds041546.mlab.com:41546/tachme'
    },

    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: false,
    port: 27017,
    servers: {
      one: {},
    },
  },
};