const admin = require('firebase-admin')
//this might all be working you just have to update watson certificate
// uncomment the line below for running a server with webpack
// const serviceAccount = require('../../googleKey.json')

//when you want to deploy uncomment this
let serviceAccount = '';
try {
  serviceAccount = JSON.parse(process.env.FIRESTORE)
}
catch (err){
  console.log('error:', err)
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();
module.exports = db
