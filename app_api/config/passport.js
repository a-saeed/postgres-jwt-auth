import fs from 'fs'
import path from 'path'
import { Strategy as jwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import User from '../models/userModel.js'
/** ES module system doesn't actually understand '__dirname' & '__filename'.. Do some twerks  */
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import passport from 'passport'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
        
                      /* --------------------------- get the public key --------------------------- */

const pathToKey = path.join(__dirname, '../', 'lib', 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

/****************since we are using asymmetric cryptography, we'll encrypt with privKey and decrypt with pubKey************************/

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() , // assuming it is stored in the authorization header (could be stored elsewhere)
    secretOrKey: PUB_KEY, //public key DECRYPTION
    algorithms: ['RS256']
}


//jwt already verified that the token is valid, pass the payload object which contains ID of user (the sub field) in db.
const verifyCallback = async (payload, done) => {
    try {
        const user = await User.findOne({ where: { id: payload.sub } })
        if (!user)
            done(null, false)
        
        done(null, user)

    } catch (err) {
        done(err, null)
    }
}
const strategy = new jwtStrategy(options,verifyCallback) //this verifies if the token is valid based on the passed options

passport.use(strategy)