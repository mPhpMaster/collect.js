'use strict';

var TARGET = Symbol('proxy_target_identity');

/**
 * higherOrderObjectProxy getter
 *
 * @param {Object} object
 * @param {string} $method
 * @param {String|undefined} prop
 * @param {any} receiver
 * @returns {any}
 */
function higherOrderObject(object, $method) {
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var receiver = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  if ($method === TARGET) {
    return object;
  }

  if ($method === true) {
    var _prop = prop || $method || undefined;

    if (_prop in object) {
      return object[_prop] || undefined;
    }

    // throw new Error(`${_prop} not exists!`);
    return object.get ? object.get(_prop) : undefined;
  }

  if (prop === undefined) {
    return object[$method] || undefined;
  }

  // const m = Reflect.get(object, $method, receiver);
  // const m = object[$method];
  // const m = (receiver || object)[TARGET][$method];
  // const m = (receiver && receiver[TARGET] || object)[$method];
  // const _method = ;//(value => value && value[prop] || undefined);

  return object[$method](function (value) {
    return value && value[prop] || undefined;
  });
}

/**
 * create higherOrderObject proxy
 *
 * @param {Object} object
 * @param {string|undefined} method
 *
 * @returns {Proxy}
 */
function higherOrderObjectProxy(object) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  return new Proxy(object, {
    /**
         *
         * @param $object
         * @param {string} _method
         * @param receiver
         * @returns {any}
         */
    get: function get($object, _method, receiver) {
      if (_method === TARGET) {
        return $object;
      }

      if (method !== undefined) {
        if (typeof _method === 'string' && _method.substr(-3) === 'Let') {
          var methodName = _method.substr(0, _method.length - 3);

          return higherOrderObjectProxy($object, methodName);
        }
        if (method === true) {
          return higherOrderObject($object, method, _method, receiver);
        }

        // return Reflect.get(...arguments);
        return higherOrderObject($object, method, _method, receiver);
      }

      return new Proxy($object, {
        get: function get($_object, prop, _receiver) {
          return higherOrderObject($_object, _method, prop, _receiver);
        }
      }, receiver);
      // return Reflect.get( this._object, this._method );
    }
  });
}

module.exports = higherOrderObjectProxy;