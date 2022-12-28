import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Make} from "../models/make.entity";
import {Repository} from "typeorm";
import {Model} from "../models/model.entity";

@Injectable()
export class ModelDao {
    constructor(
        @InjectRepository(Model)
        private modelRepository: Repository<Model>,
    ) {
    }

    findAll(): Promise<Model[]> {
        return this.modelRepository.find();
    }

    findOne(id: number): Promise<Model> {
        return this.modelRepository.findOneBy({id});
    }
}