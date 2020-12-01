const {Router} = require('express')
const router = Router()
const User = require('../models/User')

// api/friends/
router.get(
    '/:name',
    async (req, res) => {
        try {
            User.find()
                .populate("")
                .exec((err, users) => {
                    if(err) return res.status(400).send(err)
                    res.status(200).send(users)
                })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router