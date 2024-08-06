const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PERN_USER,
    host: process.env.PERN_HOST,
    database: process.env.PERN_DB,
    password: "cocopoof",
    port: process.env.PERN_PORT
});

module.exports = pool;