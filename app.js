const express = require('express');

const morgan = require('morgan');

const routeTours = require('./route/tourRoutes');
const routeUsers = require('./route/userRoutes');

const app = express();

//Middleware
app.use(express.json()); // me parsing req dalam bentuk json
if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // untuk logger
app.use(express.static(`${__dirname}/public`)); // untuk menutupi folder path secara keseluruhan

app.use((req, res, next) => {
  console.log('This is middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//function request handler

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getOneTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteOneTour);
// app.post('/api/v1/tours',insertTour);

//=========== Routing==============
// Route Tours
// app
//     .route('/api/v1/tours')
//     .get(getAllTours)
//     .post(insertTour);
// app
//     .route('/api/v1/tours/:id')
//     .get(getOneTour)
//     .patch(updateTour)
//     .delete(deleteOneTour);

// // Route Users
// app
//     .route('/api/v1/users')
//     .get(getAllUsers)
//     .post(insertUser);
// app
//     .route('/api/v1/users/:id')
//     .get(getOneUser)
//     .patch(updateUser)
//     .delete(deleteOneUser);

// ===== Mounting Route =========
// const routeTours = express.Router();
// const routeUsers = express.Router();
// Route Tours
// routeTours
//     .route('/')
//     .get(getAllTours)
//     .post(insertTour);
// routeTours
//     .route('/:id')
//     .get(getOneTour)
//     .patch(updateTour)
//     .delete(deleteOneTour);

// Route Users
// routeUsers
//     .route('/')
//     .get(getAllUsers)
//     .post(insertUser);
// routeUsers
//     .route('/:id')
//     .get(getOneUser)
//     .patch(updateUser)
//     .delete(deleteOneUser);

app.use('/api/v1/tours', routeTours);
app.use('/api/v1/users', routeUsers);

module.exports = app;
