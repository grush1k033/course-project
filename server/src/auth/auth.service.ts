import {BadRequestException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {IUser, IUserDto} from "../Interfaces/interfaces";
import { compare, compareSync } from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Token} from "./interfaces";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async register(dto: IUserDto) {
        const isExist = (await this.userService.doesUserExist(dto)).isExist;

        if(isExist) {
            throw new BadRequestException('Такой пользователь уже существует');
        }

        return this.userService.addUser(dto).catch(err => {
            this.logger.error(err);
            return null;
        })
    }

    async login(dto: Omit<IUserDto, 'name'>) {
        const user: IUser  = await this.userService.getUserByEmail(dto.email).catch(err => {
            this.logger.error(err);
            return null;
        })

        const passwordsIsMatch = compareSync(dto.password,user.password)

        if(!user || !passwordsIsMatch) {
            throw new UnauthorizedException('Неверный логин или пароль');
        }

        const accessToken = "Bearer " + this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

        return {id: user.id, accessToken};
    }
}
