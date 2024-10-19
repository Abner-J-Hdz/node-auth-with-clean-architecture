import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken{
    token: string,
    user: {
        id: string,
        name: string,
        email: string
    }
}


type SignToken = (payload: Object, duration?: string) => Promise<string | null>


interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase{


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        //Crear usuario
        const user = await this.authRepository.register(registerUserDto)

        //token
        const token = await this.signToken({id: user.id}, '48h')

        if(!token)
            throw CustomError.internalServerError("Error generating token")

        return {
            token,
            user
        }
    }

}