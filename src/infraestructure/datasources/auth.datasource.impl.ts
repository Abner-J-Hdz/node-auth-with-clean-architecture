import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb/models";
import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class authDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashpassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {


        const { name, email, password }  = registerUserDto

        try {
            
            //1 Verificar si el correo existe
            const existsEmail = await UserModel.findOne({email: email})

            if(existsEmail) throw CustomError.badRequest('User already exists')

            const encryptedPassword = this.hashpassword(password);

            const user = await UserModel.create({
                name: name,
                email: email,
                password: encryptedPassword
            })

            await user.save();

            //2 Encriptar la contraseña



            //3 Mappear la respuesta a la entidad

            return new UserEntity(
                user.id, 
                user.name, 
                user.email, 
                user.password, 
                user.roles
            )

        } catch (error) {
            if(error instanceof CustomError)
                throw error

            throw CustomError.internalServerError()
        }
    }

}
