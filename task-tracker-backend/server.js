const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)
.then(()=>console.log('MongoDB connected to the backend'))
.catch((error)=>console.error(error.message))
app.get('/', (req,res)=>{
    res.send('Application running in the backend')
    console.log('error', 'application is running in the backend.')
})
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`application is running in the http://localhost:${PORT}`)
})