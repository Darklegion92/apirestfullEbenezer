"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
//const usuarioRouter = require('./routes/Usuario.routes')
const agrupacionesRouter = require("./routes/Agrupaciones.routes");
const articulosRouter = require("./routes/Articulos.routes");
const ventasRouter = require("./routes/Ventas.routes");
const path = require("path");
const session = require("express-session");
const CONFIG = require("./config/config");
const { isAuth } = require("./middlewares/acceso");

const APP = express();

//MiddelWare
APP.use(cors());
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(
  session({
    secret: CONFIG.SECRET_TOKEN,
    resave: true,
    saveUninitialized: true,
  })
);
APP.use(morgan("dev"));

//Ruta
//APP.use('/usuario',isAuth,usuarioRouter)
APP.use("/agrupaciones", agrupacionesRouter);
APP.use("/articulos", articulosRouter);
APP.use("/ventas", ventasRouter);
//APP.use('/',inicioRouter)

//Elementos Estaticos
APP.use(express.static(path.join(__dirname, "public")));
module.exports = APP;
