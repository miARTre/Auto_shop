import {Injectable} from "@nestjs/common";
import {UserDao} from "../dao/user.dao";
import {User} from "../models/user.entity";
import {UserService} from "./user.service";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {


    // async create(data: any): Promise<User> {
    //     return this.userDao.insert(data)
    // }

    // async findOneByEmail(email: string): Promise<User> {
    //     return this.userDao.findOneByEmail(email)
    // }
    //

    // getHello() {
    //     return "Hello World";
    // }

    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        if (user && user.password === password) {
            const {username, password, ...rest} = user
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { name: user.username, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    // async findOneByData(condition: any): Promise<User> {
    //     return this.userService.findByUserName(condition);
    // }

}