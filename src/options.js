import eslint from 'eslint';
import path from 'path';
import pkg from './package.json';

export default {
  // cmd, homepage, bugs all pulled from package.json
  cmd: 'sagastandard',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  eslint,
  eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  }
};
