const emailAction = require('../configs/email-ationEnum')

module.exports = {
    [emailAction.WELCOME]: {
        subject: '[CAR SHOP] Welcome!',
        templateFileName: 'welcome'
    },

    [emailAction.FORGOT_PASS]: {
        subject: '[CAR SHOP] Forgot password',
        templateFileName: 'forgot-pass'
    }
}
