const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');

const userIDToSocketMap = {

}

const orderCount = {
  orderCount: 0
}

const options = {

}

const io = require('socket.io')(server, options);


const PORT = 8080;

//omnivore stuff
const omnivoreBaseURL = 'https://api.omnivore.io/1.0';

//firebase firestore stuff
const admin = require('firebase-admin');
const serviceAccount = require('./dyne-b0c3e-c66556202faf.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const myFirestore = admin.firestore();
myFirestore.settings({ ignoreUndefinedProperties: true })

//socket io connection for real time data transfer, set up intial userID to socket mapping
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
  socket.on('idInfo', (idInfo)=>{
      admin.auth().verifyIdToken(idInfo.idToken).then((decodedToken) => {
        userIDToSocketMap[decodedToken.uid] = socket; 
      }).catch(error => {
        console.log(error);
      })
  })
});

module.exports = {
    myFirestore,
    admin,
    io,
    userIDToSocketMap,
    orderCount
}

//have to require this now due to circular dependency with firebase
const restaurantInfoRoutes = require('./routes/restaurantInfo');
const restaurantOrderRoutes = require('./routes/restaurantOrder');
const foodRunnerRoutes = require('./routes/foodRunner');

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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use('/', restaurantInfoRoutes); //need to change this to /restaurants
app.use('/restaurantOrders', restaurantOrderRoutes);
app.use('/foodRunner', foodRunnerRoutes);






//starting the server on PORT
server.listen(8080, () => {
    console.log(`Listening on port ${PORT}`);
});
