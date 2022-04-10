const express = require('express')
const router = express.Router()
const Book= require('../models/book')

///Getting all
router.get('/', async(req, res) => {
    try{
        const book= await Book.find()
        res.json(book)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id',getBook, (req, res) => {
   res.json(res.book)
})

//Creating one
router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        writer: req.body.writer,
        genre: req.body.genre,
        publisher: req.body.publisher,
        link: req.body.link
    })

    try{
        const newBook = await book.save()
        res.status(201).json(newBook)
    } catch(err){
        res.status(400).json({message: err.message})
    }

})

//Updating one
router.patch('/:id',getBook, async (req, res) => {
    if(req.body.name != null){
        res.book.name = req.body.name
    }
    if(req.body.writer != null){
        res.book.writer = req.body.writer
    }
    if(req.body.genre != null){
        res.book.genre = req.body.genre
    }
    if(req.body.publisher != null){
        res.book.publisher = req.body.publisher
    }
    if(req.body.link != null){
        res.book.link = req.body.link
    }

    try{
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    } catch(err){
        res.status(400).json({message: err.message})
    }

 

})


//Deleting one
router.delete('/:id',getBook, async (req, res) => {
    try{
        await res.book.remove()
        res.json({message: 'Book removed'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getBook(req,res,next){
    let book
    try {
        book= await Book.findById(req.params.id)
        if(book==null){
            return res.status(404).json({message: 'Cannot find book'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.book =book
    next()
}


module.exports =router