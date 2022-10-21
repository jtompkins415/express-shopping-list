const express = require('express')
const router = new express.Router()
const ExpressError = require('../ExpressError')
const {items} = require('../fakeDB')
const app = require('../app')


app.get('/items', (req, resp, next) => {
    try{
        resp.send(items)
    }catch(e){
        next(e)
    }
})


