require('dotenv').config()
const express = require('express')

const app = express()

app.use('/', (req, res, next)=>{
    res.send('My Express App!!!')
})

app.listen(process.env.PORT)