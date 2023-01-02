import {Injectable} from "@nestjs/common";
import {User} from "../models/user.entity";
import {UserDao} from "../dao/user.dao";
import {CreateUserDto} from "../dto/create_user.dto";

@Injectable()
export class UserService {
    constructor(private userDao: UserDao) {
    }

    async register(createUserDto: CreateUserDto) {
        const newUser = User.createNewUser(createUserDto);
        return this.userDao.insert(newUser);
    }

    async findById(id: number): Promise<User> {
        return this.userDao.findOne(id);
    }


    async findByUsername(username: string): Promise<User | undefined> {
        return this.userDao.findByUserName(username)
    }

}