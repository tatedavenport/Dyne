const express = require('express');
const router = express.Router();
const firestore = require('../index').myFirestore;
const admin = require('../index').admin;

router.post('/orders', async (req, res) => { //order statuses are "needs attention", "in process", and "closed"
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
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        let newDoc = firestore.collection('restaurants').doc(decodedToken.uid).collection('menu').doc();
        console.log('newdocid')
        console.log(newDoc.id);
        newDoc.set({}).then(response => {
            //also add id to fooditem ids
            firestore.collection('restaurants').doc(decodedToken.uid).update({
                foodItemIds: admin.firestore.FieldValue.arrayUnion(newDoc.id)
            });
              
            res.send({id: newDoc.id});
        })
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send(error);
    })
});

router.post('/menu/:restID/:menuID', async (req, res) => { //restID is token but menuID is just id in firestore
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        const menuRef = firestore.collection('restaurants').doc(decodedToken.uid).collection('menu').doc(req.params.menuID);
        const response = {}
        if (req.body.name) {
            response.name = req.body.name;
        }
        if (req.body.price) {
            response.price = req.body.price;
        }
        if (req.body.category) {
            response.category = req.body.category;
        }
        if (req.body.description) {
            response.description = req.body.description;
        }
        if (req.body.imageUrl) {
            response.imageUrl = req.body.imageUrl;
        }
        menuRef.update(response).then(updateResponse => {
            res.send('successful update');
        }).catch(error => {
            res.status(400);
            res.send('Unable to update database');
        });
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send('Invalid user id token');
    });
})

router.post('/menu/:restID/newItem', async (req, res) => {
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        //create new menu item
        //firestore.collection('restaurants').doc(decodedToken.uid).collection('menu').doc()
        //return id
    }).catch(error => {
        res.status(400);
        res.send('Invalid user id token');
    })
});

router.post('/menu/:restID/:menuID/delete', async (req, res) => {
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        firestore.collection('restaurants').doc(decodedToken.uid).collection('menu').doc(req.params.menuID).delete().then(response => {
            res.send('Documente deleted');
        }).catch(error => {
            res.status(400);
            res.send('Coudln\'t delete doclument');
        })
    }).catch(error => {
        res.status(400);
        res.send('Invalid user id token');
    });
});

module.exports = router;



