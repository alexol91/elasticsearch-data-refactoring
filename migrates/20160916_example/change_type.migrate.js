'use strict';

var Migrate = require('../../migrate.app.js');

module.exports = Migrate.moveProperties(
  {
    'template.fields.required': {type: 'boolean', default: false},
    'template.fields.checked': {type: 'boolean', default: true},
    'template.fields.multivalued': {type: 'boolean', default: false},
    'template.fields.unique': {type: 'boolean', default: false}
  }
);
