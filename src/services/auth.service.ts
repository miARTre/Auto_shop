import {Injectable} from "@nestjs/common";
import {UserDao} from "../dao/user.dao";
import {User} from "../models/user.entity";

@Injectable()
export class AuthService {
    constructor(private userDao: UserDao) {
    }

    async create(data: any): Promise<User> {
        return this.userDao.insert(data)
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userDao.findOneByEmail(email)
    }
}