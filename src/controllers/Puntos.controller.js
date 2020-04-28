const conexionMYSQL = require("../config/conexionMYSQL");

async function obtener(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;
  const { documento } = req.params;
  let sql =
    "SELECT * FROM puntosclientes WHERE documentoCliente ='" +documento+"'";
  await con.query(sql, async (err, result) => {
    if (err) throw err;
    let datos = [];
    result.map((dato) => {
      data = {
        DOCUMENTO: dato.documentoCliente,
        PUNTOS: dato.acumulado,
      };
      datos.push(data);
    });
    if (datos.length > 0) res.status(200).send(datos);
    else res.status(201).send({ res: "No Se Encotnraron Resultados" });
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
