import express from "express";
import passport from "passport"

import { login, register, protect } from "../controllers/userController.js";

const userRouter = express.Router()


userRouter.post('/register', register)
userRouter.post('/login', login);

/* -- protected route that can only be accessed by users with a valid token - */
userRouter.get('/protected', passport.authenticate('jwt', {session: false}), protect);

export default userRouter;