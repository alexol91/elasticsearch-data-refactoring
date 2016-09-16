'use strict';

var Migrate = require('../../migrate.app.js');

module.exports = Migrate.moveProperties(
  {
    'fieldDeprecated': {path: ''},
    'template.lastDate': {path: ''}
  }
);
