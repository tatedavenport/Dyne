const express = require('express');
const router = express.Router();
const myFirestore = require('../index').myFirestore;
const admin = require('../index').admin;
const io = require('../index').io;
const userIDToSocketMap = require('../index').userIDToSocketMap;
const orderCount = require('../index').orderCount;
var uniqid = require('uniqid');
const verifyUser = require('../user_verification').verifyUser;


router.get('/restaurants', async (req, res) => {
    let restaurants = await myFirestore.collection('restaurants').get();
    let response = []
    restaurants.forEach(restaurant => {
        let restaurant_data = restaurant.data();
        let response_entry = {
            id: restaurant.id,
            name: restaurant_data.name,
            imageUrl: restaurant_data.imageUrl,
            hours: restaurant_data.hours
        }
        response.push(response_entry);
    }); 
    res.send(response);
})

router.get('/restaurants/:restID', async (req, res) => {
    let restID = req.params.restID;
    let restaurant = await myFirestore.collection('restaurants').doc(restID).get();
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
            foodItemIds: restaurant_data.foodItemIds
        }
        res.send(response);
    } else {
        //invalid restID
        res.status(404);
        res.send("Invalid restaurant ID");
    }
});

router.get('/restaurants/:restID/menu', async (req, res) => {
    let restID = req.params.restID;
    myFirestore.collection('restaurants').doc(restID).collection('menu').get().then(snapshot => {
        let response = []
        snapshot.forEach(doc => {
            response.push(doc.data());
        });
        res.send(response);
    }).catch(error => {
        res.status(404);
        res.send(error);
    })
});

router.post('/restaurants', async (req, res) => { //for restaurant sign up
    console.log(req.body);
    if (!req.body.name || !req.body.hours || !req.body.imageUrl) {
        res.status(400);
        res.send("Missing parameters");
    } else {
        admin.auth().verifyIdToken(req.body.userID).then(decodedToken => {
            const new_restaurant_id = decodedToken.uid;
            const response = [];
            const new_restaurant = parse_restaurant_data(req.body);
            const new_restaurant_ref = myFirestore.collection('restaurants').doc(new_restaurant_id);
            new_restaurant_ref.set(new_restaurant);
            res.send({id: new_restaurant_id});
        }).catch(error => {
            console.log(error);
            res.status(400);
            res.send("Invalid token");
        });
    }
});

router.post('/restaurants/:restID/image', async (req, res) => {
    console.log('here1');
    admin.auth().verifyIdToken(req.params.restID).then(decodedToken => {
        console.log('here2');
        myFirestore.collection('restaurants').doc(decodedToken.uid).update({imageUrl: req.body.url}).then(() => {
            res.send('restaurant image posted');
        }).catch(error2 => {
            console.log(error2);
            res.send(error2);
        });
    }).catch(error => {
        console.log(error);
        res.send(error);
    })
});

router.post('/restaurants/:restID/orders', async (req, res) => {
    let noErrors = true;
    let response = {};
    myFirestore.collection('restaurants').doc(req.params.restID).collection('menu').doc('menu').get().then(menu => {
        const menuData = menu.data().foodItems;
        const socket = userIDToSocketMap[req.params.restID];
        io.to(socket.id).emit('new-order', req.body);
        console.log('here');
        console.log(socket)
        response.orderTotal = 0;

        //For each ordered food item, find corresponding item in restaurants menu to calculate price
        req.body.foodItems.forEach(foodItem => {
            menuData.forEach(menuItem => {
                if (foodItem.id === menuItem.id) {
                    let priceForTheseItems = foodItem.count  * menuItem.price;
                    response.orderTotal += priceForTheseItems;
                }
            })
        })


        if (!req.body.tip) {
            req.body.tip = 0;
        }

        response.orderTotal += req.body.tip;
        response.orderId = orderId;

        //add order to db
        const orderId = uniqid();
        const newOrder = myFirestore.collection('restaurants').doc(req.params.restID).collection('orders').doc(orderId);
        const datetime = new Date();
        const dateString = datetime.toLocaleString();
        newOrder.set({
            date: dateString,
            foodItems: req.body.foodItems,
            restID: req.params.restID,
            tableIdentifier: req.body.tableIdentifier,
            tip: req.body.tip,
            status: "needs attention", //this won't need to change, all new orders will be "needs attention" to begin with
            orderNumber: orderCount.orderCount,
            name: req.body.name,
        }).catch(error=>{console.log(error)});
        orderCount.orderCount++;
        //send response back to client
        res.send(response);
    }).catch(error =>{
        res.status(400);
        response = {error: 'Couldn\'t create db entry'};
        res.send('Couldn\'t create db entry');
    })
})

function parse_restaurant_data(restaurant_data) { //can't use Restaurant class because firestore wants objects not created with new operator
    let restaurant = {
        name: restaurant_data.name,
        description: restaurant_data.description,
        hours: restaurant_data.hours,
        imageUrl: restaurant_data.imageUrl,
        foodItemIds: [],
    }
    return restaurant;
}

module.exports = router;