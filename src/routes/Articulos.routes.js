const { Router } = require("express");
const ArticulosCtrl = require("../controllers/Articulos.controller");

router = Router();
router
  .get("/", ArticulosCtrl.obtener)
  .get("/:nombre", ArticulosCtrl.obtener)
  .get("/*", ArticulosCtrl.error);

module.exports = router;
