import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos/auth"
import { AuthRepository } from "../../domain/repositories/auth.repository"
import { CustomError } from "../../domain/errors"
import { JwtAdapter } from "../../config"
import { UserModel } from "../../data/mongodb/models"

export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    private readonly handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.error(error);
        return res.status(500).json({ errorMessage: 'Internal server error', error})
    }

    registerUser =  (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if(error){
            res.status(400).json(error)
            return 
        } 
        
         this.authRepository.register(registerUserDto!)
        .then( async user => {
            //res.json(user)
            res.json({
                user,
                token: await JwtAdapter.generateToken({ id: user.id})
            })
        } )
        .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        res.status(200).json('Login user controller')
    }

    getUser = (req: Request, res: Response) => {
        UserModel.find().then(users => {
            res.status(200).json({
                //users, 
                user: req.body.user 
            })
        })
        .catch((error)=> res.status(500).json(error))
    }

}