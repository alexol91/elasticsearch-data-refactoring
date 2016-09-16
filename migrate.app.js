'use strict';

var Tools = require('./lib/migrate.tools.js');

module.exports = {
  moveProperties: moveProperties,
  copyDocument: copyDocument
};


function copyDocument() {
  return {
    index: function(item, options) {
      return createIndex(item, options);
    }
  };
}

function moveProperties(properties) {
  return {
    index: function(item, options) {
      var index  = createIndex(item, options);      var source = Tools.moveProperties(item._source, properties);
      return [index[0], source];
    }
  };
}


function createIndex(item, options) {
  var source = Tools.normalizeProperties(item._source);
  var index = {
    index: {
      _index: options.index,
      _type: options.type || item._type,
      _id: item._id
    }
  };

  if(item.fields && item.fields._parent && item.fields._parent !== item._id){
    index.index._parent = item.fields._parent;
  }

  return [index, source];
}

// elasticsearch-reindex -f //54.194.29.166:9200/issues7/conversations -t //54.194.29.166:9200/issues7/conversations 20160712_elastic2\change-path.migrate.js
