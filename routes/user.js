const express = require('express')
const router = express.Router()
const transporter = require('../mailer')
const User = require('../models/user')
const fs = require('fs')
const path = require('path')
///Getting all
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(req.user)
})

//Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
          
        let filePath = path.join('C:\\Users\\mdmah\\Desktop\\KENABECHA\\email-template','email.html');
        text = fs.readFileSync(filePath, { encoding: 'utf-8' })
        // text.replace('{{ name }}', req.body.name)
        message = {
            from: 'hello@example.com',
            to: req.body.email,
            subject: 'New Login',
            html: text
        }
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                // do something useful
            }
        });
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        req.user.name = req.body.name
    }
    if (req.body.email != null) {
        req.user.email = req.body.email
    }
    if (req.body.username != null) {
        req.user.username = req.body.username
    }
    if (req.body.password != null) {
        req.user.password = req.body.password
    }

    try {
        const updatedUser = await req.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }



})


//Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await req.user.remove()
        res.json({ message: 'User removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Usr could not be found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.user = user
    next()
}


module.exports = router