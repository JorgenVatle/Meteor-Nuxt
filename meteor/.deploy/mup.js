module.exports = {
  servers: {
    one: {
      host: '__DEPLOY_TARGET__',
      username: 'root',
    }
  },

  app: {
    name: 'Meteor-Nuxt',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'https://meteor-nuxt-api.wcaservices.net',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      image: 'abernix/meteord:node-12-base',
    },

    enableUploadProgressBar: false
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
};
