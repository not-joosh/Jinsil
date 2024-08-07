
// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

// contants
const SERVER_PORT = 5000

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
// localhost:5000/create_certificate

app.post("/db_test", async(req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const newTest = await pool.query("INSERT INTO test (name) VALUES($1) RETURNING *", [name]);
        console.log(pool.connect());
        res.json(newTest.rows[0]);
    } catch(error) {
        console.error(error.message);
    }
});

// create certificate
app.post("/create_certificate", async(req, res) => {
    try {
        console.log(req.body);
        const { 
            certificate_owner_uid,
            certificate_id , user_id,
            certificate_title, certificate_description,
            redirect_url, image_url,
          } = req.body;
          const newCertificate = await pool.query(
            "INSERT INTO certificates (certificate_owner_uid, certificate_id, user_id, certificate_title, certificate_description, redirect_url, image_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [certificate_owner_uid, certificate_id, user_id, certificate_title, certificate_description, redirect_url, image_url]
          );
        res.json(newCertificate.rows[0]);
        console.log("certificate created");
    } catch(error) {
        console.error(error.message);
    }
})
// get all certificates
// get a certificate

// update a certificate

// delete a certificate



app.get('/test', function(req, res) {
    console.log(req.body);
});

app.listen(SERVER_PORT, () => {
    console.log(`The server is live on port ${SERVER_PORT}`)
});
