const { v4: uuidv4 } = require('uuid');

class Restaurant {
    constructor(name, imageUrl, description, hours, foodItemIds) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.hours = hours;
        this.foodItemIds = foodItemIds;
        this.id = uuidv4();
    }
}

module.exports = Restaurant;