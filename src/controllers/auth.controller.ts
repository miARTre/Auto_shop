import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {CreateUserDto} from "../dto/create_user.dto";
import {UserService} from "../services/user.service";
import {JwtAuthGuard} from "../local.strategy/jwt-auth.guard";
import {LocalAuthGuard} from "../local.strategy/local-auth.guard.";

@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService, private userService: UserService) {
    }

    // // @UseGuards(JwtAuthGuard)
    // @Post('register')
    // async register(@Body() createUserDto: CreateUserDto) {
//
//         const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
//
//         const user = this.authService.create({
//             name: createUserDto.name,
//             username: createUserDto.username,
//             email: createUserDto.email,
//             mobile: createUserDto.mobile,
//             address: createUserDto.address,
//             password: hashedPassword,
//         });
//
//         delete (await user).password;
//
//         return user;
//
//     }
//
//     // @UseGuards(JwtAuthGuard)
//     @Post('login')
//     async login(@Body() createUserDto: CreateUserDto,
//                 @Res({passthrough: true}) response: Response) {
//
//         const user = await this.authService.findOneByEmail(createUserDto.email);
//
//         if (!user) {
//             throw new BadRequestException('Invalid credentials')
//         }
//
//         if (!await bcrypt.compare(createUserDto.password, user.password)) {
//             throw new BadRequestException('Invalid credentials')
//         }
//
//         const jwt = await this.jwtService.signAsync({id: user.id});
//
//         response.cookie('jwt', jwt, {httpOnly: true});
//
//         return {
//             message: 'success',
//         };
//     }
//
//     // @UseGuards(LocalAuthGuard)
//     @Get('user')
//     async user(@Req() request: Request) {
//
//         try {
//             const cookie = request.cookies['jwt'];
//
//             const data = await this.jwtService.verifyAsync(cookie);
//
//             if (!data) {
//                 throw new UnauthorizedException()
//             }
//
//             const user = await this.authService.findOneByData({id: data['id']});
//
//             const {password, ...rest} = user;
//
//             return rest;
//
//         } catch (e) {
//             throw new UnauthorizedException()
//         }
//
//     }
//
//     // @UseGuards(JwtAuthGuard)
//     @Post('logout')
//     logout(@Res({passthrough: true}) response: Response) {
//
//         response.clearCookie('jwt');
//
//         return {
//             message: 'success logout'
//         }
//     }
//

    // @Post('login')
    // login() {
    //
    // }
    //
    // @Get('protected')
    // getHello() {
    //     return this.authService.getHello()
    // }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    public async me(@Request() req) {
        const user = await this.userService.findById(req.user.id);
        return {
            username: user.username,
            id: user.id,
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user)
    }

}