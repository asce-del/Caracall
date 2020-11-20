const {Router} = require('express')
const router = Router()
const Product = require('../models/Product')


// api/product/
router.post(
    '/',
    async (req, res) => {
        try {

            const {name, description, categoryId, size, price} = req.body

            const newProduct = await Product.findOne({name})

            if (newProduct) {
                return res.status(400).json({message: "Product already exist"})
            }

            const product = new Product({
                categoryId, name, description, size, price
            })


            const savedProduct = await product.save()
            res.status(201).json(savedProduct)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/product/
router.get(
    '/:id',
    async (req, res) => {
        try {
            const products = await Product.find({categoryId: req.params.id})
            res.status(200).json(products)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/product/
router.delete(
    '/:id',
    async (req, res) => {
        try {
            const product = await Product.deleteOne({_id: req.params.id})
            res.status(200).json(product)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/product/
router.put(
    '/:id',
    async (req, res) => {
        try {
            const updatedProduct = await Product.updateOne({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        size: req.body.size,
                        price: req.body.price,
                        categoryId: req.body.categoryId
                    }
                })

            res.status(200).json({updatedProduct, message: 'Product updated'})


        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
            console.log(e)
        }

    }
)

module.exports = router