import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos/auth";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(private readonly datasource : AuthDatasource) {        
    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.login(loginUserDto)
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register(registerUserDto);
    }

}
