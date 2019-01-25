'use strict';
var app = require('../../server/server');
module.exports = function(Entrada) {
  Entrada.observe('before save', async function(ctx) {
    console.log(ctx.instance);
    app.models.Producto.findById(ctx.instance.productoId, function(
      err,
      producto
    ) {
      producto.insumos.forEach(insumo => {
        let consumo = ctx.instance.cantidad * insumo.cantidad;
        app.models.Insumo.findById(insumo.id, function(err, dbinsumo) {
          console.log(dbinsumo);
          dbinsumo.valor -=
            Math.round(consumo * (dbinsumo.valor / dbinsumo.cantidad) * 100) /
            100;
          dbinsumo.cantidad -= consumo;
          dbinsumo.save();
        });
      });
    });

    return;
  });
};
