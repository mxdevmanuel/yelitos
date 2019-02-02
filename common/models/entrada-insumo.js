'use strict';

var app = require('../../server/server');

module.exports = function(Entradainsumo) {
  Entradainsumo.observe('before save', (ctx, next) => {
    console.log('Instance: ', ctx.instance);
    app.models.Insumo.findOne(
      { where: { id: ctx.instance.insumoId } },
      function(err, insumo) {
        if (!err) {
          console.log('DB: ', insumo);
          insumo.updateAttributes(
            {
              cantidad: insumo.cantidad + ctx.instance.cantidad,
              valor:
                (insumo.valor * insumo.cantidad + ctx.instance.valor) /
                (insumo.cantidad + ctx.instance.cantidad)
            },
            function(err, instance) {
              if (err) console.log(err);
              next();
            }
          );
        } else {
          console.log('not found');
          next();
        }
      }
    );
  });
};
