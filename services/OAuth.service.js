const DB = require('../database').getInstance()

module.exports = {
    getByParams:  (params, userAttr) => {
        const oauth = DB.getModels('OAuth')
        const user = DB.getModels('User')

        return oauth.findOne({
            where: params,
            raw: true,
            nest: true,
            include: [{
                model: user,
                attributes: userAttr
            }]
        })
    },

    createToken:  (tokenObj) => {
        try {
            const oauth = DB.getModels('OAuth')

            return oauth.create(tokenObj, {new: true})
        }
        catch (e) {
            console.log(e)
        }
    },

    deleteByParams:  (params) => {
        try {
            const oauth = DB.getModels('OAuth')

            return oauth.destroy({
                where: params
            })
        }
        catch (e) {
            console.log(e)
        }

    }
}
