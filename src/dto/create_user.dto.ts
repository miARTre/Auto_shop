import {IsEmail} from "class-validator";

export class CreateUserDto {
    name: string;
    username: string
    password: string;
    email: string;
    mobile: number;
    address: string
}