const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: "password",
    port: "5432",
    host: "localhost",
    database: "postgres"
})

module.exports = pool