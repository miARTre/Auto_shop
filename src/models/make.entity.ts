import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Model} from "./model.entity";

@Entity()
export class Make {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Model, (model) => model.make)
    model: Model;

    constructor(car?: Partial<Make>) {
        Object.assign(this, car);
    }

    public static createNewCar(name: string) {
        return new Make({
            name,
        });
    }



}