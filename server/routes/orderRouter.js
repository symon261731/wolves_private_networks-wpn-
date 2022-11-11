const express = require('express');
const {Order} = require('../db/models')

const router = express.Router();


router.get('/all', async (req,res)=>{
    try{
    const data = await Order.findAll();
    res.json(data);
    } catch(e){
        console.log(e);
    }
})

router.post('/new', async(req,res)=>{
    // console.log('order', req.body.order);
    try{
    const {title, protocol, price, location} = req.body.order;
    const newOrder = await Order.create({
         user_id: req.session.user.id,
         title,
         protocol,
         price: Number(price),
        location
    });
    res.json(newOrder);
    }catch(e){
    console.log(e);
    }
})

module.exports = router;