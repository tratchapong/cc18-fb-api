require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', (req,res)=>{ 
	// console.log(first)
	res.json('Auth')
})
app.use('/post', ()=>{})
app.use('/comment', ()=>{})
app.use('/like', ()=>{})

app.use(notFound)
app.use(errorMiddleware)

const port = process.env.PORT || 8800
app.listen(port, ()=>console.log('Server on',port))