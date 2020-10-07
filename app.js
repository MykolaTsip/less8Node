const express = require('express')
const dotenv = require('dotenv')

const {carRouter, userRouter} = require('./routers')
const instance = require('./database').getInstance()
instance.setModel()

dotenv.config()

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use('/cars', carRouter)
server.use('/users', userRouter)

server.use('*', (err, req, res, next) => {
    res.status(err.status)
        .json({
            message: err.message,
            code: err.customCode
        })
})

server.listen(5002, (e) => {
    if (e) {
        console.log(e)
    }

    console.log('host 5002 is work!')
})


// process.on('unhandledRejection', reason => {
//     console.log('((((((((((((')
//     console.log(reason)
//     console.log('((((((((((((')
//
//     process.exit(0)
// } )
