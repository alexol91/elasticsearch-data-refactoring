'use strict';

var Migrate = require('../../migrate.app.js');

module.exports = Migrate.moveProperties(
  {
    'name': {path: 'personalInfo.name'},
    'lastName': {path: 'personalInfo.lastName'},
    'personalInfo.adress': {path: 'personalInfo.address'}
  }
);
