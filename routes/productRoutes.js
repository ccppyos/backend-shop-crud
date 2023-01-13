const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

//List all products
router.get('/', async (req, res) => {

    const products = await Product.find({ "status": true })

    res.json(products);
})


//Get one item
router.get('/:id', async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

//Create product
router.post('/createProduct', (req, res) => {


    console.log(req);

    let result = createProduct(req.body);

    result.then(product => {
        res.json(product)
    })

})

//Edit product

router.put('/:id', (req, res) => {

    let result = updateProduct(req.params.id, req.body);

    result.then((value) => {
        res.json(value);
    })

})


//Delete product

router.delete('/:id', (req, res) => {

    let result = deleteProduct(req.params.id, req.body);

    result.then((value) => {
        res.json(value);
    })

})


async function createProduct(body) {
    let producto = new Product({
        name: body.name,
        category: body.category,
        price: body.price,
        active: body.active
    })

    return await producto.save()
}

async function updateProduct(id, body) {
    let product = await Product.findOneAndUpdate({ "_id": id }, {
        $set: {
            name: body.name,
            category: body.category,
            price: body.price,
            active: body.active
        }
    }, { new: true });

    return product;
}

async function deleteProduct(id, body) {
    let product = await Product.findOneAndUpdate({ "_id": id }, {
        $set: {
            status: false
        }
    }, { new: true });

    return product;
}





module.exports = router



