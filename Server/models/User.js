const { v4: uuidv4 } = require('uuid');

class User {
    constructor(name, imageUrl, orderIds) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.orderIds = orderIds;
        this.id = uuidv4();
    }
}

module.exports = User;