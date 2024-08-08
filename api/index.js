// Setting up Express backend with cors
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());



// This will be for verifying firebase user jwt token
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// This will be for verifying firebase user jwt token
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
app.use(verifyToken);

// This will be for verifying firebase user jwt token
app.get('/api/user', (req, res) => {
  res.json({ message: 'You are authorized' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    }
);