const express = require('express');

const router = express.Router();
const Order = require("../models/orderModel")

//List all products
router.get('/', async (req, res) => {

    const orders = await Order.find({"status": true}).populate('items.product')

    res.json(orders);
})


//Get one item
router.get('/:id', async (req, res) => {

    const order = await Order.findById(req.params.id).populate('items.product');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'order not found' })
    }
})

//Create order
router.post('/createOrder',  (req,res)=>{

    let result = createOrder(req.body);

    result.then(order => {
        res.json(order)
    })
        
})

//CompleteReject Order

router.put('/completeRejectOrder/:id', (req,res)=>{

    let result = completeOrder(req.params.id, req.body)

    result.then((value)=>{
        res.json(value);
    })

})

//Add item

router.put('/addItem/:id', (req,res)=>{

    const item = {
        qty: req.body.qty,
        cost: req.body.cost,
        product: {
            _id: req.body._productId,
            price: req.body.price
        }
    }

    let result = addItem(req.params.id, item);

    result.then((value)=>{
        res.json(value);
    })

})

//Delete Item

router.put('/deleteItem/:id', (req,res)=>{

    
    let result = deleteItem(req.params.id, req.body.item);

    result.then((value)=>{
        res.json(value);
    })

})

//Update Item

router.put('/updateItem/:id', (req,res)=>{

    
    let result = updateItem(req.params.id, req.body.item);

    result.then((value)=>{
        res.json(value);
    })

})

//Edit order

router.put('/:id', (req,res)=>{

    let result = updateOrder(req.params.id, req.body);

    result.then((value)=>{
        res.json(value);
    })

})


//Delete order

router.delete('/:id', (req,res)=>{

    let result = deleteProduct(req.params.id, req.body);

    result.then((value)=>{
        res.json(value);
    })

})


async function createOrder(body){
    const [day, month, year] = body.date.split('/');

    let order = new Order({
        orderNumber: body.orderNumber,
        statusOrder: body.statusOrder,
        date: new Date(year,month,day),
        customer: body.customer,
        taxesAmount: body.taxesAmount,
        totalTaxes: body.totalTaxes,
        totalAmount: body.totalAmount,
        items: body.items,
    })

    return await order.save()
}

async function addItem(id,item){

    console.log(item)

    let order = await Order.findById(id).populate('items.product');



    order.items.push(item);

    const subTotal = order.items.reduce((partialSum, item) => {console.log(item) 
        return partialSum + (item.product.price) * (item.qty)}, 0)
    const totalTaxes = subTotal * (0.01 + 0.05 + 0.08 + 0.02)

    order.taxesAmount = subTotal
    order.totalTaxes = totalTaxes
    order.totalAmount = subTotal + totalTaxes

    order.save();

    return order;
}

async function deleteItem(id,item){

    let order = await Order.findById(id).populate('items.product');

    const nuevoArray =  order.items.filter((i) => (i._id.toString()) !== item._id) 

    order.items = nuevoArray;


    const subTotal = order.items.reduce((partialSum, item) => {console.log(item) 
        return partialSum + (item.product.price) * (item.qty)}, 0)
    const totalTaxes = subTotal * (0.01 + 0.05 + 0.08 + 0.02)

    order.taxesAmount = subTotal
    order.totalTaxes = totalTaxes
    order.totalAmount = subTotal + totalTaxes

    console.log(order)

    order.save();

    return order;
}

async function updateItem(id,item){

    let order = await Order.findById(id).populate('items.product');

    const indexItem =  order.items.findIndex((i) => (i._id.toString()) === item._id) 

    order.items[indexItem].qty = +(item.qty)

    const subTotal = order.items.reduce((partialSum, item) => {console.log(item) 
        return partialSum + (item.product.price) * (item.qty)}, 0)
    const totalTaxes = subTotal * (0.01 + 0.05 + 0.08 + 0.02)

    order.taxesAmount = subTotal
    order.totalTaxes = totalTaxes
    order.totalAmount = subTotal + totalTaxes

    console.log(order)

    order.save();

    return order;
}


async function updateOrder(id,body){
    let order = await Order.findOneAndUpdate({"_id": id},{
        $set:{
            name: body.name,
            price: body.price,
        }
    }, {new:true});

    return order;
}


async function completeOrder(id,body){

    const status = body.statusOrder ? "Completed" : "Rejected";

    let order = await Order.findOneAndUpdate({"_id": id},{
        $set:{
            statusOrder: status,
        }
    }, {new:true});

    order = await Order.findById(id).populate('items.product');


    return order;
}

async function deleteOrder(id,body){
    let order = await Order.findOneAndUpdate({"_id": id},{
        $set:{
            status: false
        }
    }, {new:true});

    return order;
}


module.exports =  router



