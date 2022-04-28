import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { issueJWT } from "../lib/utils.js";


export const register = async (req, res, next) => {
    try {
        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //save user provided from req.body
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        const user = await newUser.save()
        
        //issue a new jwt token 
        const signedJwt = issueJWT(user)

        res.json({success: true, user: user, token: signedJwt.token, expiresIn: signedJwt.expiresIn })

    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        if (!user) {
            res.status(401).json({ success: false, msg: "invalid credentials" })
            throw "user not found"
        }
        //check valid password
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {            
            res.status(401).json({ success: false, msg: "invalid credentials" })
            throw "incorrect password"
        }
        //password is valid, issue a token 
        const signedJwt = issueJWT(user)
        res.json({ success: true, user: user, token: signedJwt.token, expiresIn: signedJwt.expiresIn })
        
    } catch (err) {
        next(err)
    }
}
//this route is protected in the routes folder
export const protect = (req, res, next) => {
    res.status(200).json({msg: "you are authorized"})
}