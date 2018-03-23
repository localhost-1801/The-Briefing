const admin = require('firebase-admin')
let serviceAccount
try {
  serviceAccount = require('../../googleKey.json')
}
catch (err){
  serviceAccount =  JSON.parse(process.env.FIRESTORE)
  console.log('in production environment')
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();
module.exports = db
