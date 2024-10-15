import { RegisterUserDto } from "../dtos/auth";
import { UserEntity } from "../entities";

export abstract class AuthDatasource{

    // TODO: login
    //abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

    abstract register(registerUserDto:  RegisterUserDto): Promise<UserEntity>
}