import { Validators } from "../../../config";

export class LoginUserDto {
    private constructor(
        public email: string,
        public password:string
    ){}

    static create(object:{[key:string]: any }) : [string | null, LoginUserDto?]{
        const { email, password } = object;

        if(!email) return ['Missing Email']
        if(!Validators.email.test(email)) return ['Email is not valid']
        if(!password) return ['Missing Password']

        return [ null, new LoginUserDto(email, password) ]
    }



}