import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos/auth"
import { AuthRepository } from "../../domain/repositories/auth.repository"
import { CustomError } from "../../domain/errors"
import { UserModel } from "../../data/mongodb/models"
import { RegisterUser } from "../../domain/useCases/auth/register-user.useCase"
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto"
import { LoginUser } from "../../domain/useCases/auth/login-user.useCase"

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
        
        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then((data)=>{
                res.status(200).json(data)
            }).catch(err=> {
                this.handleError(err, res)
            })
    }

    loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body)

        if(error){
            res.status(400).json(error)
            return 
        } 

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => { 
                this.handleError(err, res)
            })

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