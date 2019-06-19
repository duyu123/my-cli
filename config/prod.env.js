'use strict'
const webpackConfigFileOption = {
  'inner' : '"***"',
  'test': '"***"',
  'release': '"***"'
}

let webpackConfigFilePath = webpackConfigFileOption[process.env.BUILD_ENV] || '"***"'

const prodEnv = {
  NODE_ENV: '"production"',
  SERVER_NAME: webpackConfigFilePath
}

module.exports = prodEnv