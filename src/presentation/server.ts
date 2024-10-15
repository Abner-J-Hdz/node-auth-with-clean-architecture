
import express, { Router } from "express"

interface OptionsServer{
    port?: number,
    routes: Router

}

export class Server{

    public readonly app = express()
    private readonly port : number;
    private readonly routes : Router;

    constructor(options: OptionsServer){
        this.port = options.port ?? 4100;
        this.routes = options.routes
    }


    async start(){
        
        //Midlewares
        this.app.use(express.json())
        //Para poder usar los x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}))

        //Usar la rutas definidas
        this.app.use(this.routes)

        //Levantar el puerto del servidor
        this.app.listen(this.port, () => {
            console.log(`Server running on Port: ${this.port}`);
        })

    }

}

