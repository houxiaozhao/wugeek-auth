'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545901525061_7988';
  config.secret =
    'Autem dolor molestias et odit sint.Ullam omnis quasi ullam ipsa occaecati cumque id.';
  // add your config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/' + appInfo.name,
    options: {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };
  return config;
};
