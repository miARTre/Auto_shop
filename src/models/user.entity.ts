import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post.entity";
import {CreateUserDto} from "../dto/create_user.dto";

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

    public static createNewUser(createUserDto: CreateUserDto) {
        return new User({
            name: createUserDto.name,
            username: createUserDto.username,
            email: createUserDto.email,
            mobile: createUserDto.mobile,
            address: createUserDto.address,
            password: createUserDto.password,
        })
    }
}