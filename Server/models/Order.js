const { v4: uuidv4 } = require('uuid');

class Order {
    constructor(userId, date, restaurantId, qrCode, tip, foodItems) {
        this.userId = userId;
        this.date = date;
        this.restaurantId = restaurantId;
        this.qrCode = qrCode;
        this.tip = tip;
        this.foodItems = foodItems;
        this.id = uuidv4();
    }
}

module.exports = Order;