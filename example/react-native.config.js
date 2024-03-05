const path = require('path');
const pack = require('../package.json');

module.exports = {
  dependencies: {
    [pack.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
