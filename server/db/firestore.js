const admin = require('firebase-admin')
const secrets = require('../../secrets')

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

db.dropTable = function deleteCollection(db, collectionPath, batchSize) {
    var collectionRef = db.collection(collectionPath);
    var query = collectionRef.orderBy('__name__').limit(40);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}
function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                return 0;
            }
            // Delete documents in a batch
            var batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
            if (numDeleted === 0) {
                resolve();
                return;
            }
            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        }).then(console.log('Deleting - Landing Page Articles have been dropped from Firestore'))
        .catch(reject);
}

module.exports = db

