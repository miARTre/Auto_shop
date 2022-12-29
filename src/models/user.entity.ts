import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    password: string;

    @Column({unique: true})
    mobile: number;

    @Column({unique: true})
    email: string;

    @Column()
    address: string;

    @OneToMany(() => Post, (post) => post.user)
    post: Post[];


    constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }

}