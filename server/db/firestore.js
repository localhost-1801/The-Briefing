const admin = require('firebase-admin')
let serviceAccount = '';
try {
  serviceAccount = require('../../googleKey.json')
  if (serviceAccount.length === 0){
    serviceAccount = JSON.parse(process.env.FIRESTORE)
  }
}
catch (err){
  console.log('error:', err)
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();
module.exports = db
