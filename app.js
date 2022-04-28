import express from 'express'
import passport from 'passport'
import './app_api/models/db.js'
import './app_api/config/passport.js'
import 'dotenv/config'
/* ------------------------------ import routes ----------------------------- */
import userRouter from './app_api/routes/userRoutes.js';

/* ------------- ********************************************** ------------- */
const app = express();
const port = process.env.PORT || 3000

/* ------------------------------- parsing middleware ------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/* --------------------------- initialize passport -------------------------- */
app.use(passport.initialize())

/* ---------------------------- routes--------------------------- */
app.use('/user', userRouter)

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});