const {Router} = require('express')
const router = Router()
const CategoryGroup = require('../models/CategoryGroup')


// api/category_group/
router.post(
    '/',
    async (req, res) => {
        try {

            const {name} = req.body

            const category_group = new CategoryGroup({
                name
            })

            const savedCategoryGroup = await category_group.save()
            res.status(201).json(savedCategoryGroup)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/category_group/
router.get(
    '/',
    async (req, res) => {
        try {
            const categories_groups = await CategoryGroup.find()
            res.status(200).json(categories_groups)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/category_group/
router.delete(
    '/:id',
    async (req, res) => {
        try {
            const categories_groups = await CategoryGroup.deleteOne({_id: req.params.id})
            res.status(200).json(categories_groups)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/category_group/
router.put(
    '/:id',
    async (req, res) => {
        try {
            const updatedCategoryGroup = await CategoryGroup.updateOne({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name
                    }
                })

            res.status(200).json({updatedCategoryGroup, message: 'CategoryGroup updated'})


        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
            console.log(e)
        }

    }
)

module.exports = router