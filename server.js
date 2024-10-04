require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const authRoute = require('./routes/auth-route')
const postRoute = require('./routes/post-route')
const authenticate = require('./middlewares/authenticate')


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/post', authenticate, postRoute)
app.use('/comment', ()=>{})
app.use('/like', ()=>{})

app.use(notFound)
app.use(errorMiddleware)

const port = process.env.PORT || 8800
app.listen(port, ()=>console.log('Server on',port))