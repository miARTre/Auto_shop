import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";
import {Vehicle} from "./vehicle.entity";

@Entity()
export class Post {

    constructor(data: Omit<Post, "id">) {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn({default: new Date()})
    created_at: Date;

    @UpdateDateColumn({default: new Date()})
    update_at: Date;

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(() => Vehicle)
    @JoinColumn({name: 'vehicle_id'})
    vehicle: Vehicle;

}