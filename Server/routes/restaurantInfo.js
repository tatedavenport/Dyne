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
        res.send(foodItemIds);
    }
});

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