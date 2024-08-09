// Setting up Express backend with cors
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const functions = require('firebase-functions');
const fetch = require('node-fetch');

const verifyToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authorized' });
  }
};

// This will be for verifying firebase user jwt token
exports.getImage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
      const imageUrl = req.query.url;
      try {
          const response = await fetch(imageUrl);
          const buffer = await response.buffer();
          res.set('Content-Type', response.headers.get('Content-Type'));
          res.send(buffer);
      } catch (error) {
          res.status(500).send('Error fetching image');
      }
  });
});

app.use(verifyToken);

app.get('/api/user', (req, res) => {
  res.json({ message: 'You are authorized' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    }
);