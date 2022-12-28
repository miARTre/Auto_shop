import {Injectable} from "@nestjs/common";
import {MakeDao} from "../dao/make.dao";


@Injectable()
export class MakeService {

    constructor(private makeDao: MakeDao) {
    }

}