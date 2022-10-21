const express = require('express')
const router = new express.Router()
const ExpressError = require('../ExpressError')
const items = require('../fakeDB')



router.get('/items', (req, resp, next) => {
    try{
       return resp.send(items)
    }catch(e){
       return next(e)
    }
})

router.post('/items', (req, resp, next) => {
    try{
        const newItem = { name: req.body.name, price: req.body.price }
        items.push(newItem)
        resp.status(201).json({ added: newItem })
    }catch(e){
      return next(e)
    }
})

router.get('/items/:name', (req, resp, next) => {
  try{
    console.log(req.params)
  }catch(e) {
    next(e)
  }
})

router.patch('/items/:name', (req, resp, next) => {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  foundItem.name = req.body.name 
  resp.json({ updated: foundCat })
})

module.exports = router