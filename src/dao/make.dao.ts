import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Make} from "../models/make.entity";


@Injectable()
export class MakeDao {
    constructor(
        @InjectRepository(Make)
        private makeRepository: Repository<Make>,
    ) {
    }

    findAll(): Promise<Make[]> {
        return this.makeRepository.find();
    }

    findOne(id: number): Promise<Make> {
        return this.makeRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.makeRepository.delete(id);
    }
    
}