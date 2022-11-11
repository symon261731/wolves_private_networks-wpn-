const express = require('express');
const {Order} = require('../db/models')

const router = express.Router();


router.get('/all', async (req,res)=>{
    const data = await Order.findAll();
    res.json(data);
})

router.post('/new', async(req,res)=>{
    const {title, protocol, price, location} = req.body;
    const newOrder = await Order.create({
         user_id: req.session.user.id,
         title,
         protocol,
         price: Number(price),
        location
    });
    res.json(newOrder);
})

module.exports = router;