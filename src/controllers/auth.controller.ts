import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../dto/create_user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

        return this.authService.create({
            name: createUserDto.name,
            username: createUserDto.username,
            email: createUserDto.email,
            mobile: createUserDto.mobile,
            address: createUserDto.address,
            password: hashedPassword,
        });
    }

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        const user = await this.authService.findOneByEmail(createUserDto.email);

        if (!user) {
            throw new BadRequestException('Invalid credentials')
        }

        if (!await bcrypt.compare(createUserDto.password, user.password)) {
            throw new BadRequestException('Invalid credentials')
        }

        return user;
    }
}