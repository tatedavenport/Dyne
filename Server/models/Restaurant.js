var uniqid = require('uniqid');

class Restaurant {
    constructor(name, imageUrl, description, hours, foodItemsIds) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.hours = hours;
        this.foodItemsIds = foodItemsIds;
        this.id = uniqid();
    }
}

module.exports = Restaurant;