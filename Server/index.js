const express = require('express');
const app = express();
const restaurantInfoRoutes = require('./routes/restaurantInfo');

const PORT = 8080;

app.use('/', restaurantInfoRoutes) //route handler included in routes

app.listen(8080, () => {
    console.log(`Listening on port ${PORT}`);
});