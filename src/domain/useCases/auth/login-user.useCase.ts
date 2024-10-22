import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/loginUser.dto";
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

interface ILoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUser implements ILoginUserUseCase{
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {
    }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        
        const user =  await this.authRepository.login(loginUserDto)

        const token = await this.signToken({id: user.id}, '48h')

        if(!token)
            throw CustomError.internalServerError("Error generating token")

        return {
            token,
            user:{
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    }

}