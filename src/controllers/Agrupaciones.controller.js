const conexionFirebird = require("../config/conectionFirebird");

async function obtener(req, res) {
  res.setHeader("Content-Type", "application/json");

  const user = "sysdba";
  const password = "masterkey";
  const sql =
    "SELECT f.fain_nom as nombreFamilia,f.fain_cod as codigoFamilia ,g.grin_nom as nombreGrupo, g.grin_cod as codigoGrupo from FAMILIA_INVENTARIO f, grupo_inventario g where f.fain_cod = g.fain_cod";
  await conexionFirebird(user, password, async (err, con) => {
    await con.query(sql, async function (err, result) {
      if (err) throw err;
      let rest = await result.reduce((prev, current, index, arr) => {
        // Compruebo si ya existe el elemento
        let exists = prev.find((x) => {
          return (
            x.NOMBREFAMILIA.toString() === current.NOMBREFAMILIA.toString()
          );
        });
        // Si no existe lo creo con un array vacío en VALOR
        if (!exists) {
          exists = {
            NOMBREFAMILIA: current.NOMBREFAMILIA.toString(),
            grupos: [current.NOMBREGRUPO.toString()],
          };
          prev.push(exists);
        } else if (current.NOMBREGRUPO.toString() != null) {
          let grupo = current.NOMBREGRUPO.toString();
          exists.grupos.push(grupo);
        }
        return prev;
      }, []);
      res.status(200).send(rest);
    });
    try {
      con.release();
    } catch (e) {}
  });
}
async function filtro(req, res) {
  res.setHeader("Content-Type", "application/json");

  const user = "sysdba";
  const password = "masterkey";
  const { familia, grupo } = req.params;

  let sql = "";
  if (grupo) {
    sql =
      "SELECT a.arti_cod as CODIGO, a.arti_des as NOMBRE, p.prar_fijo as PRECIO, p.prar_dto1 as DESCUENTO, m.marc_nom as MARCA," +
      " f.fain_nom as NOMBREFAMILIA, g.grin_nom NOMBREGRUPO" +
      " FROM ARTICULO a, familia_inventario f, grupo_inventario g, precios_articulo p, marcas m" +
      " WHERE p.arti_cod = a.arti_cod and a.fain_cod = f.fain_cod and a.grin_cod = g.grin_cod and f.fain_cod = g.fain_cod and" +
      " m.marc_cod = a.marc_cod and f.fain_nom = '" +
      familia.toUpperCase() +
      "'  and g.grin_nom = '" +
      grupo.toUpperCase() +
      "'  and p.lipr_cod = 1 and a.esar_cod = 'A'";
  } else {
    console.log(familia);
    sql =
      "SELECT a.arti_cod as CODIGO, a.arti_des as NOMBRE, p.prar_fijo as PRECIO, p.prar_dto1 as DESCUENTO, m.marc_nom as MARCA," +
      " f.fain_nom as NOMBREFAMILIA, g.grin_nom NOMBREGRUPO" +
      " FROM ARTICULO a, familia_inventario f, grupo_inventario g, precios_articulo p, marcas m" +
      " WHERE p.arti_cod = a.arti_cod and a.fain_cod = f.fain_cod and a.grin_cod = g.grin_cod and f.fain_cod = g.fain_cod and" +
      " m.marc_cod = a.marc_cod and f.fain_nom = '" +
      familia.toUpperCase() +
      "'  and p.lipr_cod = 1 and a.esar_cod = 'A'";
  }
  await conexionFirebird(user, password, async (err, con) => {
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
  filtro,
  error,
};
