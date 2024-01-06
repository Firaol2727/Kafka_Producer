import JwtStrategy from 'passport-jwt';
import LocalStrategy from 'passport-local';

import { comparePassword, generateAccessToken } from './security';
import UserDal from '../../dals/user/User.dal';
import { User } from '../../models/user/User';
import { NotFoundError } from '../../error/error';

/**
 * Passport JWT Strategy
 * 
 * @param email
 * @param password
 */
export const PassportJWTStrategy = new JwtStrategy.Strategy({ jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "THIS_IS_THE_SECERT_KEY" }, (payload, done) => {
    console.log("JWT strategy is running fine  ! =================================   ");
    UserDal.findOne({ id: payload._id },null,null)
        .then((user: User) => {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
        .catch(() => {
            return done(null, false);
        });
});