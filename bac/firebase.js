const admin = require('firebase-admin');
const serviceAccount = require('./ahhhhh-lpbn-310f299b575c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
