'use strict';

var Migrate = require('../../migrate.app.js');

module.exports = Migrate.moveProperties(
  {
    'fields.fields': {path: ''},
    'fields.options.next': {path: ''},
    'fields.labelId': {path: 'fields.fieldId'},
    'fields.labelToShow': {path: 'fields.label'},
    'fields.type': {path: 'fields.kind'},
    'fields.family': {path: 'fields.type'},
    'fields': {path: 'template.fields'},
    'templateId': {path: 'template.templateId'},

    'template.fields.required': {type: 'boolean', default: false},
    'template.fields.checked': {type: 'boolean', default: true},
    'template.fields.multivalued': {type: 'boolean', default: false},
    'template.fields.unique': {type: 'boolean', default: false}
  }
);