import { Router } from "express";
import { AuthRoutes } from "./auth/authRoutes";


export class AppRoutes {
    static get routes(): Router{

        const router = Router();

        //definimos todas las rutas principales

        router.use('/api/auth', AuthRoutes.routes)
        //router.use('/api/user')

        return router
    }
}