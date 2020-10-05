const { v4: uuidv4 } = require('uuid');

class Order {
    constructor(userId, date, restaurantId, qrCode, tip) {
        this.userId = userId;
        this.date = date;
        this.restaurantId = restaurantId;
        this.qrCode = qrCode;
        this.tip = tip;
        this.id = uuidv4();
    }
}

module.exports = Order;