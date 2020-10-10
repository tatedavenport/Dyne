const express = require('express');
const router = express.Router();
const myFirestore = require('../index').myFirestore
const Restaurant = require('../models/Restaurant');
var uniqid = require('uniqid');


router.get('/restaurants', async (req, res) => {
    let restaurants = await myFirestore.collection('restaurants').get();
    let response = []
    restaurants.forEach(restaurant => {
        let restaurant_data = restaurant.data();
        let response_entry = {
            id: restaurant.id,
            name: restaurant_data.name,
            imageUrl: restaurant_data.imageUrl
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
    let menu = await myFirestore.collection('restaurants').doc(restID).collection('menu').doc('menu').get();
    let menu_data = menu.data();
    if (menu_data) {
        res.send(menu_data.foodItems)
    } else {
        res.status(404);
        res.send("Invalid restaurant ID");
    }
});

router.post('/restaurants', async (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.description || !req.body.hours || !req.body.imageUrl) {
        res.status(400);
        res.send("Missing parameters");
    } else {
        const new_restaurant_id = uniqid();
        const foodItemIds = [];
        const response = [];
        for (let i = 0; i < req.body.foodItems.length; i++) {
            let newId = uniqid();
            req.body.foodItems[i].id = newId;
            response.push({name: req.body.foodItems[i].name, id: newId});
            foodItemIds.push(newId)
        }
        const new_restaurant = parse_restaurant_data(req.body, foodItemIds);
        const new_restaurant_ref = await myFirestore.collection('restaurants').doc(new_restaurant_id);
        await new_restaurant_ref.set(new_restaurant);
        await new_restaurant_ref.collection('menu').doc('menu').set({foodItems: req.body.foodItems});
        let main_response = {
            restaurant_id: new_restaurant_ref.id,
            foodItemIds: foodItemIds
        }
        res.send(main_response);
    }
});

router.post('/restaurants/:restID/orders', async (req, res) => {
    console.log(req.body);
    let noErrors = true; //set this to false and do error checking later
    let response = {};
    if (noErrors) {
        const menu = await myFirestore.collection('restaurants').doc(req.body.restID).collection('menu').doc('menu').get();
        const menuData = menu.data().foodItems;
        console.log(menuData);
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

        //add order to db
        const orderId = uniqid();
        const newOrder = await myFirestore.collection('orders').doc(orderId);
        const datetime = new Date();
        const dateString = datetime.toISOString().slice(0,10);
        newOrder.set({
            date: dateString,
            foodItems: req.body.foodItems,
            restID: req.body.restID,
            tableIdentifier: req.body.tableIdentifier,
            tip: req.body.tip
        });

        //send response back to client
        res.send(response);
    } else {
        //this is what happens if there's no restaurant with that id or that restaurant has no food items with those id's. don't need error checking for first learning prototype
    }
})

function parse_restaurant_data(restaurant_data, foodItemIds) { //can't use Restaurant class because firestore wants objects not created with new operator
    let restaurant = {
        name: restaurant_data.name,
        description: restaurant_data.description,
        hours: restaurant_data.hours,
        imageUrl: restaurant_data.imageUrl,
        foodItemIds: foodItemIds
    }
    return restaurant;
}

module.exports = router;