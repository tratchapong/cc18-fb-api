require('dotenv').config()
const express = require('express')
const app = express()



const port = process.env.PORT || 8800
app.listen(port, ()=>console.log('Server on',port))