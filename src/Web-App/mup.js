module.exports = {
  servers: {
    one: {
      host: '54.71.205.83',
      username: 'ubuntu',
      pem: './awsserver.pem'
      // password:
      // or leave blank for mup authenticate from ssh-agent
    }
  },  docker: {
        image:'abernix/meteord:base',
        args:[ //optional, lets you add / overwrite any parameter on the docker run command
            "--link='mongodb://server:aws@ds041546.mlab.com:41546/tachme'",
        ]
    },

  meteor: {
    name: 'Web-App',
    path: '.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
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