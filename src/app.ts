import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main()
})()

async function main(){
    // conexion a base de datos de mongo
    await MongoDatabase.connect({
        dbName: envs.MONGO_DBNAME,
        mongoUrl: envs.MONGO_URL
    })
    //  inicio de nuestro server, si la db no coonecta el servidor no se levantará 
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}