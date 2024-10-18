import dotenv from 'dotenv';
import { get } from 'env-var'

// con esto solucionarmos el error que no halla el archivo de .env
dotenv.config();

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DBNAME: get('MONGO_DBNAME').required().asString(),
    JWT_SECRET_KEY: get('JWT_SECRET_KEY').required().asString()
}

