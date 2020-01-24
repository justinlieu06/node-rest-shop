const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

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