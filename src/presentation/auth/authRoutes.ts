import { Router } from "express";
import { AuthController } from "./authController";
import { AuthRepositoryImpl } from "../../infraestructure/repositories";
import { authDatasourceImpl } from "../../infraestructure/datasources";
import { AuthMidleware } from "../middlewares";



export class AuthRoutes {
    static get routes(): Router{

        const router = Router();

        const datasource = new authDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const authController =  new AuthController(authRepository);
        //definimos todas las rutas principales

        router.post('/login', authController.loginUser)

        router.post('/register', authController.registerUser)

        router.get('/', [ AuthMidleware.validateJTW ],authController.getUser)

        return router
    }
}