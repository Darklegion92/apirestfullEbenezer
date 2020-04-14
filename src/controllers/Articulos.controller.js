const conexionFirebird = require("../config/conectionFirebird");
const {USER,PASS} = require("../config/config");

async function obtener(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { nombre } = req.params;

  let sql = "";
  if (nombre) {
    sql =
      "SELECT a.arti_cod as CODIGO, a.arti_des as NOMBRE, p.prar_fijo as PRECIO, p.prar_dto1 as DESCUENTO, m.marc_nom as MARCA," +
      " f.fain_nom as NOMBREFAMILIA, g.grin_nom NOMBREGRUPO" +
      " FROM ARTICULO a, familia_inventario f, grupo_inventario g, precios_articulo p, marcas m" +
      " WHERE p.arti_cod = a.arti_cod and a.fain_cod = f.fain_cod and a.grin_cod = g.grin_cod and f.fain_cod = g.fain_cod and" +
      " m.marc_cod = a.marc_cod and p.lipr_cod = 1 and a.esar_cod = 'A' and a.arti_des like '%" +
      nombre.toUpperCase() +
      "%'";
  } else {
    sql =
      "SELECT a.arti_cod as CODIGO, a.arti_des as NOMBRE, p.prar_fijo as PRECIO, p.prar_dto1 as DESCUENTO, m.marc_nom as MARCA," +
      " f.fain_nom as NOMBREFAMILIA, g.grin_nom NOMBREGRUPO" +
      " FROM ARTICULO a, familia_inventario f, grupo_inventario g, precios_articulo p, marcas m" +
      " WHERE p.arti_cod = a.arti_cod and a.fain_cod = f.fain_cod and a.grin_cod = g.grin_cod and f.fain_cod = g.fain_cod and" +
      " m.marc_cod = a.marc_cod and p.lipr_cod = 1 and a.esar_cod = 'A'";
  }
  await conexionFirebird(USER, PASS, async (err, con) => {
    if (err) {
      console.log(err);
      
    }
    await con.query(sql, async function (err, result) {
      if (err) throw err;
      let datos = [];
      result.map((dato) => {
        data = {
          CODIGO: dato.CODIGO.toString(),
          NOMBRE: dato.NOMBRE.toString(),
          PRECIO: dato.PRECIO.toString(),
          DESCUENTO: dato.DESCUENTO.toString(),
          MARCA: dato.MARCA.toString(),
          NOMBREFAMILIA: dato.NOMBREFAMILIA.toString(),
          NOMBREGRUPO: dato.NOMBREGRUPO.toString(),
        };
        datos.push(data);
      });
      res.status(200).send(datos);
    });
    try {
      con.release();
    } catch (e) {}
  });
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  obtener,
  error,
};
