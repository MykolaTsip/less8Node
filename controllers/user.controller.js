const {userService, OAuthService, emailService} = require('../services')
const {passHesh, passCompare, tokinazer} = require('../helper')
const constant = require('../configs/constants')
const emailAction = require('../configs/email-ationEnum')

module.exports = {
    AllUsers: async (req, res) => {
        try {
            let users = await userService.allUser()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    },
    NewUser: async (req, res) => {
        try {
            const Newuser = req.body


            Newuser.password = await passHesh(req.body.password)


            let user = await userService.newUser(Newuser)


            await emailService.sendMail(user.email, emailAction.WELCOME, {userName: user.name})
            console.log('---------')
            console.log(Newuser)
            console.log('--------')

            res.json(user)
        } catch (e) {
            console.log(e)
        }
    },
    Login: async (req, res, next) => {
        try {
            let {password} = req.user
            const user = req.body

            await passCompare(password, user.password)

            let tokens = tokinazer()

            OAuthService.createToken({
                ...tokens,
            user_id: req.user.id
            })


            res.json(tokens)
        } catch (e) {
            next(e)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
             const user = req.user
 const oldToken = req.get(constant.AUTHORIZATION)
            const newToken = tokinazer()

            await OAuthService.deleteByParams({refresh_token: oldToken})


             await OAuthService.createToken({
                ...newToken,
             user_id: user.id
             })

            res.json(newToken)
        } catch (e) {
            next(e)
        }

    }
}
