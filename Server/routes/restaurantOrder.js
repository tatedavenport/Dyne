const { response } = require('express');
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
        firestore.collection('restaurants').doc(decodedToken.uid).collection('orders').get().then(snapshot => {
            let response = [];
            if (snapshot.empty) {
                console.log('No available orders');
            } else {
                snapshot.forEach(doc => {
                    let data = doc.data();
                    response.push({id: doc.id, data: data});
                });
            }
            res.send(response);
        }).catch(error => {
            console.log(error);
            res.status(400);
            res.send(error);
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
            firestore.collection('restaurants').doc(decodedToken.uid).update({foodItemIds: admin.firestore.FieldValue.arrayRemove(req.params.menuID)}).then(() => {
                res.send('Document deleted');
            }).catch(error => {
                res.send('2');
                console.log(error);
            })
        }).catch(error => {
            res.status(400);
            console.log(error);
            res.send('1');
        }).catch(error => {
            res.status(400);
            console.log(error);
            res.send('3');
        })
    }).catch(error => {
        res.status(400);
        console.log(error);
        res.send('4');
    });
});

router.post('/orderUpdate/:restID', async (req, res) => {
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        //for each order id in req body, update order status
        //req.body.ids is an array of ids
        //req.body.newStatus is the new status (needs attention, in process, or closed)
        //then respond with the orders
        firestore.collection('restaurants').doc(decodedToken.uid).collection('orders').get().then(snapshot =>{
            if (snapshot.empty) {
                console.log('No orders found');
                res.status(400);
                res.send('No orders found');
            }
            ids = [];
            snapshot.forEach(doc => {
                if (req.body.ids.includes(doc.id)) {
                    ids.push(doc.id);
                }
            });
            //now we have the ids we want to change
            const batch = firestore.batch();
            ids.forEach(id => {
                console.log(`setting batch for ${id}`);
                let docRef = firestore.collection('restaurants').doc(decodedToken.uid).collection('orders').doc(id);
                batch.update(docRef, ({status: req.body.newStatus}));
            });
            batch.commit().then(dontneed => {
                firestore.collection('restaurants').doc(decodedToken.uid).collection('orders').get().then(snapshot =>{
                    if (snapshot.empty) {
                        console.log('No orders found');
                        res.status(400);
                        res.send('No orders found');
                    }
                    let response = [];
                    snapshot.forEach(doc => {
                        response.push({id: doc.id, data: doc.data()});
                    });
                    res.send(response);
                });
            }).catch(error => {
                console.log(error);
                console.log("Error with batched set");
                res.status(400);
                res.send(error);
            })
        })
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send('Invalid restaurant token');
    });
});


router.get('/restaurants/:restID', async (req, res) => {

    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        let restID = req.params.restID;
        let restaurant = firestore.collection('restaurants').doc(decodedToken.uid).get().then(restaurant =>{
            let restaurant_data = restaurant.data();
            let response = {}
            console.log(restaurant_data)
            if (restaurant_data) {
                //valid restID
                response = {
                    id: restaurant.id,
                    name: restaurant_data.name,
                    description: restaurant_data.description,
                    hours: restaurant_data.hours,
                    foodItemIds: restaurant_data.foodItemIds,
                    city: restaurant_data.city,
                    country: restaurant_data.country,
                    address: restaurant_data.address,
                    zip: restaurant_data.zip,
                    email: restaurant_data.email,
                    state: restaurant_data.state,
                    imageUrl: restaurant_data.imageUrl
                }
                res.send(response);
            } else {
                //invalid restID
                res.status(404);
                res.send("Invalid restaurant ID");
            }
        });
    }).catch(error =>{
        console.log(error);
    }) 
});

router.post('/restaurants/:restID/newUrl', async(req, res) => {
    firestore.collection('restaurants').doc(req.params.restID).update({imageUrl: req.body.imageUrl}).then(response => {
        res.send('done');
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.send(error);
    })
})

router.get('/restaurants/:restID/orders/:orderID', async (req, res) => {
    console.log('hit')
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        firestore.collection('restaurants').doc(decodedToken.uid).collection('orders').doc(req.params.orderID).get().then(doc => {
            res.send({id: doc.id, data: doc.data()});
        }).catch(error => {
            console.log(error);
            res.status(400);
            res.send(error);
        })
    }).catch(error => {
        console.log(error);
    })
});

module.exports = router;



