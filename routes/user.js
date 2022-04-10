const express = require('express')
const router = express.Router()
const User= require('../models/user')

///Getting all
router.get('/', async(req, res) => {
    try{
        const user= await User.find()
        res.json(user)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id',getUser, (req, res) => {
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

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err){
        res.status(400).json({message: err.message})
    }

})

//Updating one
router.patch('/:id',getUser, async (req, res) => {
    if(req.body.name != null){
        req.user.name = req.body.name
    }
    if(req.body.email != null){
        req.user.email = req.body.email
    }
    if(req.body.username != null){
        req.user.username = req.body.username
    }
    if(req.body.password != null){
        req.user.password = req.body.password
    }

    try{
        const updatedUser = await req.user.save()
        res.json(updatedUser)
    } catch(err){
        res.status(400).json({message: err.message})
    }

 

})


//Deleting one
router.delete('/:id',getUser, async (req, res) => {
    try{
        await req.user.remove()
        res.json({message: 'User removed'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getUser(req,res,next){
    let user
    try {
        user= await User.findById(req.params.id)
        if(user==null){
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    req.user =user
    next()
}


module.exports =router