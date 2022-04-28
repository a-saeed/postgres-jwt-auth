import fs from 'fs'
import path from 'path'
import jsonwebtoken from "jsonwebtoken";
/** ES module system doesn't actually understand '__dirname' & '__filename'.. Do some twerks  */
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

            /* ------------------- ISSUE/SIGN A WEB TOKEN USING PRIVATE KEY ------------------- */ 

const pathToKey = path.join(__dirname, 'keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

export function issueJWT(user) {
    const id = user.id;
    const expiresIn = '1d';   

    const payload = {
        sub: id,
        iat: Date.now() //issued at
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })
    
    return {
        token: "Bearer " + signedToken, //Authorization header format
        expiresIn
    }
}