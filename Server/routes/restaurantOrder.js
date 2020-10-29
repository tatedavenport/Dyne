const express = require('express');
const router = express.Router();
const firestore = require('../index').myFirestore;
const admin = require('../index').admin;

router.post('/orders', async (req, res) => { //get all needs action process orders
    if (!req.body.status) {
        res.status(400);
        res.send('Request body needs to specify status');
    }
    admin.auth().verifyIdToken(req.body.idToken).then(decodedToken => {
        firestore.collection('restaurants').doc(decodedToken.uid).collection('orders').where('status', '==', req.body.status).get().then(snapshot => {
            response = [];
            if (snapshot.empty) {
                console.log('No matching documents for needs action');
            } else {
                snapshot.forEach(doc => {
                    let data = doc.data();
                    response.push(data);
                });
            }
            res.send(response);
        });
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send('Invalid user id token')
    })
});

router.get('/menu/:restID', async (req, res) => {
    //verify restaurant
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        //get all menuitem docs for that restaurant
        const snapshot = firestore.collection('restaurants').doc(decodedToken.uid).collection('menu').get().then(snapshot =>{
            if (snapshot.empty) {
                console.log('No matching documents');
                res.status(400);
                res.send('No matching documents');
            }
            const response = []
            snapshot.forEach(doc => {
                response.push({id: doc.id, data: doc.data()});
            });
            res.send(response);
        });
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send("Invalid user id token");
    });
});

router.post('/menu/:restID', async (req, res) => {
    console.log('here');
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        firestore.collection('restaurants').doc(decodedToken.uid).collection('menu').add({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category
        });
        res.send("Success");
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send(error);
    })
});

module.exports = router;



