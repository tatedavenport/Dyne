const { v4: uuidv4 } = require('uuid');

class FoodItem {
    constructor(name, imageUrl, price, description, category, isPopular) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.category = category;
        this.isPopular = isPopular;
        this.id = uuidv4();
    }
}

module.exports = FoodItem;