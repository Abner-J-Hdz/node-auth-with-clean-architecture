import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb/models";
import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos/auth";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class authDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashpassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } =  loginUserDto

        try {
            //1 Verificar si el correo existe
            const userByEmail = await UserModel.findOne({email: email});

            if(!userByEmail) throw CustomError.badRequest('User does not exist')

            //2 Verifica si la contraseña es correta
            const isPasswordMatching = this.comparePassword(password, userByEmail.password)
            if( !isPasswordMatching) throw CustomError.badRequest('Invalid credentials')

            return UserMapper.userEntityFromObject(userByEmail!)
            
        } catch (error) {
            if(error instanceof CustomError)
                throw error

            throw CustomError.internalServerError()            
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password }  = registerUserDto

        try {
            
            //1 Verificar si el correo existe
            const existsEmail = await UserModel.findOne({email: email})

            if(existsEmail) throw CustomError.badRequest('User already exists')
                
            //2 Encriptar la contraseña
            const encryptedPassword = this.hashpassword(password);

            const user = await UserModel.create({
                name: name,
                email: email,
                password: encryptedPassword
            })

            await user.save();




            //3 Mappear la respuesta a la entidad
            return UserMapper.userEntityFromObject(user)
 
        } catch (error) {
            if(error instanceof CustomError)
                throw error

            throw CustomError.internalServerError()
        }
    }

}
