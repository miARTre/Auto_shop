import {IsNotEmpty} from "class-validator";

export class CreateCarsDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    body_type: string;

    @IsNotEmpty()
    fuel_type: string
}