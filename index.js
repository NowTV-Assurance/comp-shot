require('babel-register');
const compShot = require('./src');
const path = require('path');

const testConfig = {
  port: 4000,
  baselineImageDirectory: path.join(__dirname, 'temp/regression/base'),
  newImageDirectory: path.join(__dirname, 'temp/regression/temp'),
  resemblejsThreshold: 0.1
}
compShot.start(testConfig);
module.exports = compShot;