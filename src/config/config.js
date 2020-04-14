module.exports = {
    PORT: process.env.PORT || 3001,
    DB: process.env.MONGODB_URI || 'C:\\SYSplus\\Datos\\001\\sysplus.fdb',
    SECRET_TOKEN: "SOLTEC-tecnologiaydesarrollo$",
    IP: process.env.IP || "192.168.1.100",
    USER:process.env.USER || "sysdba",
    PASS:process.env.PASS || "1qaz++",
    PORT_DB: process.env.PORT_DB || 3050,
    USER_MYSQL: process.env.USER_MYSQL || "root",
    PASS_MYSQL: process.env.PASS_MYSQL || "1234",
    DB_MYSQL: process.env.DB_MYSQL || "informessfc",
}