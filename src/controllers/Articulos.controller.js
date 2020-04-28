const conexionMYSQL = require("../config/conexionMYSQL");

async function obtener(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;
  const { nombre } = req.params;
  let sql = "";

  if (nombre) {
    sql =
      "SELECT a.*, f.nombreFamilia, g.nombreGrupo, m.nombremarca FROM articulos " +
      "a,familias f,grupos g, marcas m " +
      "WHERE a.idFamilia = f.idfamilia " +
      "AND a.idgrupo = g.idgrupo AND g.idfamilia = f.idfamilia AND " +
      "m.idmarca = a.idmarca AND a.nombreArticulo like '%" +
      nombre.toUpperCase() +
      "%'";
  } else {
    sql =
      "SELECT a.*, f.nombreFamilia, g.nombreGrupo, m.nombremarca " +
      "FROM articulos a,familias f,grupos g, marcas m " +
      "WHERE a.idFamilia = f.idfamilia " +
      "AND a.idgrupo = g.idgrupo AND g.idfamilia = f.idfamilia AND " +
      "m.idmarca = a.idmarca";
  }

  await con.query(sql, async (err, result) => {
    if (err) throw err;
    let datos = [];
    result.map((dato) => {
      data = {
        CODIGO: dato.idarticulo,
        NOMBRE: dato.nombreArticulo,
        PRECIO: dato.precioArticulo,
        DESCUENTO: dato.descuentoArticulo,
        NOMBREMARCA: dato.nombremarca,
        NOMBREFAMILIA: dato.nombreFamilia,
        NOMBREGRUPO: dato.nombreGrupo,
      };
      datos.push(data);
    });
    if (datos.length > 0) res.status(200).send(datos);
    else res.status(201).send({ res: "No Se Encontraron Datos" });
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
