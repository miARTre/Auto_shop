import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {Post} from "./models/post.entity";
import {UserDao} from "./dao/user.dao";
import {PostDao} from "./dao/post.dao";
import {Make} from "./models/make.entity";
import {Model} from "./models/model.entity";
import {Vehicle} from "./models/vehicle.entity";
import {VehicleOptionalEquipment} from "./models/vehicle.optional.equipment.entity";
import {MakeController} from "./controllers/make.controller";
import {MakeService} from "./services/make.service";
import {MakeDao} from "./dao/make.dao";
import {ModelDao} from "./dao/model.dao";
import {Vehicle_optional_equipmentDao} from "./dao/vehicle_optional_equipment.dao";
import {PostsService} from "./services/posts.service";
import {VehicleDao} from "./dao/vehicle.dao";
import {PostController} from "./controllers/post.controller";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {LocalStrategy} from "./local.strategy/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./local.strategy/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'autoscoutDB',
            entities: [User, Post, Make, Model, Vehicle, VehicleOptionalEquipment],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Post, Make, Model, Vehicle, VehicleOptionalEquipment]),
        JwtModule.register({
            secret: 'SECRET',
            signOptions: {expiresIn: '1y'},
        }),
        PassportModule,
    ],
    controllers: [MakeController, PostController, AuthController],
    providers: [UserDao, PostDao, MakeDao,
        ModelDao, Vehicle_optional_equipmentDao,
        VehicleDao, MakeService, PostsService, AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AppModule {
}
