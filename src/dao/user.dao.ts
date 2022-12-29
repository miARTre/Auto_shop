import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserDao {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id});
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({email});
    }

    findOneByData(condition: any): Promise<User> {
        return this.usersRepository.findOneBy(condition);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async insert(newUser: User): Promise<User> {
        return this.usersRepository.save(newUser, {reload: true});
    }

}