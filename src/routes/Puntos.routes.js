const { Router } = require("express");
const PuntosCtrl = require("../controllers/Puntos.controller");

router = Router();
router
  .get("/:documento", PuntosCtrl.obtener)
  .get("/*", PuntosCtrl.error);

module.exports = router;
