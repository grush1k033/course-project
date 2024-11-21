import {BadRequestException, Body, Controller, Get, Post} from '@nestjs/common';
import {IUserDto} from "../Interfaces/interfaces";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('register')
    async register(@Body() dto: IUserDto) {
        const user = await this.authService.register(dto);
        if(!user) {
            throw new BadRequestException(`Не получается зарегистрировать пользователя с данными ${JSON.stringify(dto)}`)
        }
        return user;
    }

    @Post('login')
    async login(@Body() dto: IUserDto) {
        const token = await this.authService.login(dto);
        if(!token) {
            throw new BadRequestException(`Не получается войти с данными ${JSON.stringify(dto)}`)
        }

        return token;
    }

    @Get('refresh')
    refreshTokens() {

    }
}
