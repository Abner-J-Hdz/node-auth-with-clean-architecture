import { RegisterUserDto } from "../dtos/auth";
import { UserEntity } from "../entities";

export abstract class AuthRepository{
    
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}