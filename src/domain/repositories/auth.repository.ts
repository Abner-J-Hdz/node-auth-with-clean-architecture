import { RegisterUserDto } from "../dtos/auth";
import { LoginUserDto } from "../dtos/auth/loginUser.dto";
import { UserEntity } from "../entities";

export abstract class AuthRepository{
    
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}