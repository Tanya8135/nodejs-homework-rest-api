const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/users')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}

passport.use(
    new Strategy(params, async (payload, done) => {
        try {
            const user = await User.getUserByEmail(payload.id);
            if (!user) {
                return done(new Error("User not found"), false);
            }
            if (!user.token) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }

        // try {
        //     const user = await User.getUserByEmail(payload.id)
        //     if (!user) {
        //         return done(null, false)
        //     } else {
        //         return done(null, user);
        //     }
        // } catch (err) {
        //     return done(err, false)
        // }
    })
)