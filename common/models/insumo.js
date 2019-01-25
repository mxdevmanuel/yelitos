'use strict';

module.exports = function(Insumo) {
  Insumo.minimos = function(cb) {
    Insumo.find({}, function(err, instances) {
      if (instances !== null) {
        let minimos = instances.filter(
          instance => instance.cantidad <= instance.minimo * 2
        );
        cb(null, minimos);
      } else {
        cb(null, {});
      }
    });
  };

  Insumo.remoteMethod('minimos', {
    http: {
      path: '/minimos',
      verb: 'get'
    },
    returns: {
      arg: 'minimos',
      type: 'array'
    }
  });
};
