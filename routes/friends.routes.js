const {Router} = require('express')
const router = Router()
const User = require('../models/User')

// api/friends/
router.get(
    '/:name',
    async (req, res) => {
        try {
            const users = await User.find(req.params)
            res.status(200).json(users)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router