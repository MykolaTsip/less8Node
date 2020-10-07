const {Router} = require('express')
const {userController} = require('../controllers')
const {userMiddleware, userEnter, refreshToken} = require('../middleware')

const userRouter = Router();

userRouter.get('/', userController.AllUsers)
userRouter.post('/new', userMiddleware, userController.NewUser)
userRouter.post('/login', userEnter, userController.Login)
userRouter.post('/refresh', refreshToken, userController.refreshToken)


module.exports = userRouter
