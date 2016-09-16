'use strict';

module.exports = {
  normalizeProperties: normalizeProperties,
  moveProperties: moveProperties,
  moveProperty: moveProperty,
  fetchFromObject: fetchFromObject,
  putToObject: putToObject
};

function normalizeProperties(obj) {
  if (obj instanceof Object) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var normalizedKey = key;
        if (key.indexOf('.') !== -1) {
          normalizedKey  = key.replace('.', '');
          obj[normalizedKey] = obj[key];
          delete obj[key];
        }
        obj[normalizedKey] = normalizeProperties(obj[normalizedKey]);
      }else{
        delete obj[key];
      }
    }
  }
  return obj;
}

function moveProperties(obj, properties) {
  for (var propSrc in properties) {
    if (properties.hasOwnProperty(propSrc)) {
      moveProperty(obj, propSrc, properties[propSrc]);
    } else {
      console.log('Error', propSrc, properties);
    }
  }
  return obj;
}

function moveProperty(obj, propSrc, action) {

  if (!action.hasOwnProperty('path')) {
    action.path = propSrc;
  }

  var values = fetchFromObject(obj, propSrc, propSrc !== action.path);

  values = makeReadyValues(values, action.type, action.default);

  if (action.path.length) putToObject(obj, action.path, values);
}

function fetchFromObject(obj, propPath, andDelete) {
  andDelete = andDelete || false;

  if (typeof obj === 'undefined' || obj === null) {
    return null;
  }

  var _index = propPath.indexOf('.');
  if (_index > -1) {
    var prop = propPath.substring(0, _index);

    if (obj[prop] instanceof Array) {
      var values = [];
      for (var i in obj[prop]) {
        if (obj[prop].hasOwnProperty(i)) {
          values[i] = fetchFromObject(obj[prop][i], propPath.substr(_index + 1), andDelete);
        }
      }
      return values;
    } else {
      return fetchFromObject(obj[prop], propPath.substr(_index + 1), andDelete);
    }
  }

  var value = obj[propPath];
  if (andDelete) delete obj[propPath];
  return value;
}

function putToObject(obj, propPath, value) {

  var _index = propPath.indexOf('.');
  if (_index > -1) {
    var prop = propPath.substring(0, _index);
    obj      = obj || {};

    if (!obj.hasOwnProperty(prop) || obj[prop] === null) {
      obj[prop] = {};
    }

    if (obj[prop] instanceof Array) {
      for (var i in obj[prop]) {
        if (obj[prop].hasOwnProperty(i)) {
          putToObject(obj[prop][i], propPath.substr(_index + 1), value[i]);
        }
      }
      return value;
    } else {
      return putToObject(obj[prop], propPath.substr(_index + 1), value);
    }
  }
  if (typeof value !== 'undefined') obj[propPath] = value;
  return obj[propPath];
}

function makeReadyValues(value, type, defaultValue) {
  if (value instanceof Array) {
    var values = [];
    for (var i in value) {
      if (value.hasOwnProperty(i)) {
        values[i] = makeReadyValue(value[i], type, defaultValue);
      }
    }
    return values;
  } else {
    return makeReadyValue(value, type, defaultValue);
  }
}

function makeReadyValue(value, type, defaultValue) {
  if (value === null && typeof defaultValue !== 'undefined') {
    value = defaultValue;
  }
  if (value !== null && typeof type !== 'undefined') {
    value = castingTo(value, type);
  }
  return value;
}

function castingTo(value, type) {
  switch (type) {
    case 'integer':
    case 'long':
      return parseInt(value);
    case 'float':
    case 'double':
      return parseFloat(value);
    case 'boolean':
      return Boolean(value);
    case 'string':
      return value.toString();
    default:
      return value;
  }
}