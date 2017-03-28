const path = require('path');
const pkg = require('../package.json');

module.exports = {
  // cmd, homepage, bugs all pulled from package.json
  cmd: 'sagastandard',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  eslint: require('eslint'),
  eslintConfig: {
    configFile: path.join(__dirname, '../eslintrc.json')
  }
};
