import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Make} from "./make.entity";

@Entity()
export class Model {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @ManyToOne(type => Model, model => model.parent, {nullable: true})
    @JoinColumn({name: 'parent_id'})
    parent: Model;

    @ManyToOne(() => Make, make => make.model)
    @JoinColumn({name: 'make_id'})
    make: Make;

}