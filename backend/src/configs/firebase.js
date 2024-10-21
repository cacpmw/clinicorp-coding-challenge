const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const credentials = require("../../ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = getFirestore();

module.exports = db;
