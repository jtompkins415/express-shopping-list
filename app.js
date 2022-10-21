const express = require('express')
const ExpressError = require('./expressError')
const shoppingRoutes = require('./routes/shopping-list-routes')

const app = express()

app.use(express.json())
app.use('/shopping-list', shoppingRoutes)


//Global Error
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: {message, status}
    });
});

module.exports = app 