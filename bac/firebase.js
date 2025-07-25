const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT || '{}');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
