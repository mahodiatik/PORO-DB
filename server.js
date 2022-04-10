require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())
const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.use(express.json())
const bookRouter = require('./routes/book')
app.use('/book', bookRouter)

mongoose.connect(process.env.DB_URL);

const db= mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=> console.log('Connected to database'))

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})