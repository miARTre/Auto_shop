import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../dto/create_user.dto";
import {JwtService} from "@nestjs/jwt";
import {Request, Response} from "express";

@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService,
                private jwtService: JwtService) {
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

        const user = this.authService.create({
            name: createUserDto.name,
            username: createUserDto.username,
            email: createUserDto.email,
            mobile: createUserDto.mobile,
            address: createUserDto.address,
            password: hashedPassword,
        });

        delete (await user).password;

        return user;
    }

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto,
                @Res({passthrough: true}) response: Response) {

        const user = await this.authService.findOneByEmail(createUserDto.email);

        if (!user) {
            throw new BadRequestException('Invalid credentials')
        }

        if (!await bcrypt.compare(createUserDto.password, user.password)) {
            throw new BadRequestException('Invalid credentials')
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return {
            message: 'success',
        };
    }

    @Get('user')
    async user(@Req() request: Request) {

        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException()
            }

            const user = await this.authService.findOneByData({id: data['id']});

            const {password, ...rest} = user;

            return rest;

        } catch (e) {
            throw new UnauthorizedException()
        }

    }

    @Post('logout')
    logout(@Res({passthrough: true}) response: Response) {

        response.clearCookie('jwt');

        return {
            message: 'success logout'
        }
    }

}