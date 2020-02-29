const express    = require('express');
const authRoutes = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require("../configs/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timeismoney-622cd.firebaseio.com"
});


authRoutes.get('/loggedin', (req, res, next) => {
  // console.log('logged in head', req.headers);
  if (req.headers.authorization) {
    admin.auth().verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {
        // next();
        console.log('token?', decodedToken);
        // decodedToken.uid, decodedToken.email
        res.status(200).json({message: "Authorized"});
        return;
      }).catch(() => {
        res.status(403).json({message: 'Unauthorized'});
      });
  } else {
    res.status(403).json({message: 'Unauthorized'});
  }
    // // req.isAuthenticated() is defined by passport
    // if (req.isAuthenticated()) {
    //     res.status(200).json(req.user);
    //     return;
    // }
    // res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;