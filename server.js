const router = require('./routes/htmlRoutes');
const apiRouter = require('./routes/apiRoutes');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

//Initialization of the Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the htmlRoutes for routing
app.use('/', router);

// Use the apiRoutes for routing
app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
