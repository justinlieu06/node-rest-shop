const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//update mongo connection
mongoose.connect('mongodb+srv://node-shop-user:' + process.env.MONGO_ATLAS_PW + 'node-shop-password@node-rest-shop-cluster-0-uwkwd.mongodb.net/test?retryWrites=true&w=majority', 
{
  // useMongoClient: true
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
});

//Routes which should handle requests
//if the url starts with /products, then use productRoutes which can be found by the path in require
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

//normal template
// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!'
//   });
// });

module.exports = app;