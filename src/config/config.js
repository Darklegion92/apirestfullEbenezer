module.exports = {
    PORT: process.env.PORT || 3001,
    DB: process.env.MONGODB_URI || 'D:\\SYSplus\\Datos\\PRU\\sysplus.fdb',
    SECRET_TOKEN: "SOLTEC-tecnologiaydesarrollo$",
    IP: process.env.IP || "localhost",
    PORT_DB: process.env.PORT_DB || 3050,
    USER_MYSQL: process.env.USER_MYSQL || "root",
    PASS_MYSQL: process.env.PASS_MYSQL || "1234",
    DB_MYSQL: process.env.DB_MYSQL || "informessfc",
}