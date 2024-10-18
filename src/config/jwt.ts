import jwt from 'jsonwebtoken'
import { envs } from './'

const JWT_SECRET_KEY = envs.JWT_SECRET_KEY

export class JwtAdapter {

    static async generateToken(
        payload : Object, 
        duration: string = '2h'): Promise<string | null>{

        return new Promise((resolve) => {
            
            jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: duration }, (err, token) => {
                if(err) return resolve(null)
                resolve(token!)
            })

        })
    }

    //uso de genericos llamados types <T>
    static validateToken<T>(token:string): Promise<T | null> {
        return new Promise((resolve)=> {
            jwt.verify(token, JWT_SECRET_KEY, (err, decode) => {
                if(err) return resolve(null)
                resolve(decode as T)
            })
        })
    }


}
