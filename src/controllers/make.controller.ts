import {Body, Controller, Post} from "@nestjs/common";
import {MakeService} from "../services/make.service";
import {CreateCarDto} from "../dto/make.dto";
import {CreateCarsDto} from "../dto/createCarsDto";

@Controller()
export class MakeController {
    constructor(private readonly makeService: MakeService) {
    }

}


