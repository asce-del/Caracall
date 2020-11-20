const {Router} = require('express')
const router = Router()
const Category = require('../models/Category')


// api/category/
router.post(
    '/',
    async (req, res) => {
        try {

            const {name, description, groupId} = req.body

            const suitableCategories = await Category.find({$and:[{groupId: groupId}, {name: name}]})

            if (suitableCategories.length > 0) {
                return res.status(400).json({message: "Category already exist"})
            }


            const category = new Category({
                groupId, name, description
            })


            const savedCategory = await category.save()
            res.status(201).json(savedCategory)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/category/
router.get(
    '/:id',
    async (req, res) => {
        try {
            const categories = await Category.find({groupId: req.params.id})
            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/category/
router.delete(
    '/:id',
    async (req, res) => {
        try {
            const category = await Category.deleteOne({_id: req.params.id})
            res.status(200).json(category)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/category/
router.put(
    '/:id',
    async (req, res) => {
        try {
            const updatedCategory = await Category.updateOne({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        groupId: req.body.groupId
                    }
                })

            res.status(200).json({updatedCategory, message: 'Category updated'})


        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
            console.log(e)
        }

    }
)

module.exports = router