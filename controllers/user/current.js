const User = require('../../models/users')
const { HttpError } = require('../../helpers')
const { randomUUID } = require('crypto')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Object} - Відповідь повертає 200 з об'єктом користувача (email та subscription) або помилку 401, якщо користувач не авторизований.
 */
const current = async (req, res, next) => {
    const verificationToken = randomUUID()
    if (!req.user) {
        next(HttpError(401, "Not authorized"))
    }

    const { _id } = req.user
    const user = await User.findById(_id)

    res.status(200).json({
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
        verificationToken: verificationToken
    })
}

module.exports = current