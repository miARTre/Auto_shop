import {IsNotEmpty} from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    name: string;
}

