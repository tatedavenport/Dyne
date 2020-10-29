const admin = require('./index').admin;

async function verifyUser(idToken) {
    let uid;
    await admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        uid = decodedToken.uid;
    }).catch(()=>{
        uid = null;
    });
    return uid;
}

module.exports = {
    verifyUser
}