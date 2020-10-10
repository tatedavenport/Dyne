const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 8080;

//omnivore stuff
const omnivoreBaseURL = 'https://api.omnivore.io/1.0';

//firebase stuff
const admin = require('firebase-admin');
const serviceAccount = require('./dyne-b0c3e-c66556202faf.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const myFirestore = admin.firestore();

module.exports = {
    myFirestore
}

//have to require this now due to circular dependency with firebase
const restaurantInfoRoutes = require('./routes/restaurantInfo');



//express middleware
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use('/', restaurantInfoRoutes) //route handler included in routes

//starting the server on PORT
app.listen(8080, () => {
    console.log(`Listening on port ${PORT}`);
});
