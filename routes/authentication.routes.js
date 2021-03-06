const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// api/auth/register
router.post(
    '/register',
    [
        check('name', 'Incorrect name').isLength({min: 3, max: 20}),
        check('email', 'Incorrect email').isEmail()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect fields"
                })
            }

            const {name, email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: "User already exist"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({name, email, password: hashedPassword})

            await user.save()

            req.session.isAuth = true
            req.session.user = user

            res.status(200).json({
                name: user.name,
                isAuthenticated: true,
                userId: user.id,
                message: "User created and logged in"
            })


        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect fields"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: "No user found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Wrong password, try again"})
            }

            req.session.isAuth = true
            req.session.user = user

            res.status(200).json({
                name: user.name,
                isAuthenticated: true,
                userId: user.id,
                message: "User logged in"
            })

        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }

    }
)

// api/auth/update
router.put('/update/:id', (req, res, next) => {


    const {name, email, password} = req.body
    const user = new User({
        _id: req.params.id,
        name: name,
        email: email,
        password: bcrypt.hash(password, 12),
    });


    User.updateOne({_id: req.params.id}, user).then(
        () => {
            res.status(201).json(
                {
                    name: user.name,
                    email: user.email,
                    isAuthenticated: true,
                    userId: user.id,
                    message: "User updated!"
                });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});



// api/auth/logout
router.post(
    '/logout',
    async (req, res) => {
        try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else res.status(200).json({message: "User logged out"})
        })
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    }
)


module.exports = router