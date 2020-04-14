const mysql = require('mysql')
const CONF = require('../config/config')

module.exports = ()=>{
    return(mysql.createConnection({
            host: CONF.IP,
            user: CONF.USER_MYSQL,
            password: CONF.PASS_MYSQL,
            database: CONF.DB_MYSQL
    }))
}