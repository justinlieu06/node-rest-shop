const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


//if the url starts with /products, then use productRoutes which can be found by the path in require
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//normal template
// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!'
//   });
// });

module.exports = app;