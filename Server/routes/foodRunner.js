const express = require('express');
const router = express.Router();
const firestore = require('../index').myFirestore;
const admin = require('../index').admin;


router.get('/restaurants', async (req, res) => {
    let response = []
    firestore.collection('restaurants').get().then(snapshot => {
        if (snapshot.empty) {
            res.status(400);
            res.send('No restaurants found');
        } else {
            snapshot.forEach(doc => {
                response.push({id: doc.id, data: doc.data()});
            });
            res.send(response);
        }
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send(error);
    });
});

router.get('/restaurants/:restID', async (req, res) => {
    firestore.collection('restaurants').doc(req.params.restID).get().then(doc => {
        if (!doc.exists) {
            res.status(400);
            res.send('That document doesn\'t exist');
        } else {
            res.send({id: doc.id, data: doc.data()});
        }
    });
});

router.get('/restaurants/:restID/orders', async (req, res) => {
    let response = [];
    firestore.collection('restaurants').doc(req.params.restID).collection('orders').get().then(snapshot => {
        if (snapshot.empty) {
            res.send([]);
        } else {
            snapshot.forEach(doc => {
                response.push({id: doc.id, data: doc.data()});
            });
            res.send(response);
        }
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send(error);
    });
});

router.post('/restaurants/:restID/orders/:orderID/run', async (req, res) => {
    firestore.collection('restaurants').doc(req.params.restID).collection('orders').doc(req.params.orderID).get().then(doc => {
        if (doc.data().running) {
            res.status(400);
            res.send("Someone is already running that order")
        } else {
            firestore.collection('restaurants').doc(req.params.restID).collection('orders').doc(req.params.orderID).update({
                running: true
            }).then(response => {
                res.send(response);
            }).catch(error => {
                console.log(error);
                res.send(error);
            })
        }
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send(error);
    })
});



module.exports = router;