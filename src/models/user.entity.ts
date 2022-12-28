import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    mobile: number;

    @Column()
    email: string;

    @Column()
    address: string;

    @OneToMany(() => Post, (post) => post.user)
    post: Post[];


    constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }

}