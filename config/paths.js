const path = require('path');

const ROOT = path.join(__dirname, '..');
const PATHS = {
  SRC:         ROOT + '/src',
  PUBLIC:      ROOT + '/public',
  BUILD:       ROOT + '/public/build',
  STYLES_DIST: ROOT + '/semantic-ui/dist'
};

module.exports = PATHS;
