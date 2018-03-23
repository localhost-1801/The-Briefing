const admin = require('firebase-admin')
let serviceAccount
try {
  serviceAccount = require('../../googleKey.json')
}
catch (err){
  serviceAccount = JSON.parse(FIRESTORE)
  console.log('in production environment', serviceAccount)
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();
module.exports = db
