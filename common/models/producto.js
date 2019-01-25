'use strict';

module.exports = function(Producto) {
  Producto.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      let insumosSimples = ctx.instance.insumos.reduce((salida, actual) => {
        if (salida.hasOwnProperty(actual.id)) {
          salida[actual.id].cantidad += actual.cantidad;
        } else {
          salida[actual.id] = actual;
        }
        return salida;
      }, {});
      ctx.instance.insumos = Object.values(insumosSimples);
    }
    next();
  });
};
