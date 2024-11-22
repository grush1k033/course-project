import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {CheckUserDto, IUser, IUserDto} from "../Interfaces/interfaces";
import { genSaltSync, hashSync } from 'bcrypt';
import {ConfigService} from "@nestjs/config";


@Injectable()
export class UserService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService,
        private configService: ConfigService
    ) {}

    async addUser(dto: IUserDto) {
        const passwordHashed = this.hashPassword(dto.password);
        await this.databaseService.pool.query(this.commonService.create<IUserDto>({
            ...dto,
            password: passwordHashed
        }));
        return {
            name: dto.name,
            email: dto.email,
        };
    }

    async getAllUser() {
        return (await this.databaseService.pool.query(this.commonService.getAll()))[0]
    }

    async getUser(id: string) {
        return (await this.databaseService.pool.query(this.commonService.getByID(id)))[0][0]
    }

    async getUserByEmail(email: string) {
        return (await this.databaseService.pool.query(`SELECT * FROM users WHERE email = '${email}'`))[0][0] as IUser
    }

    async doesUserExist(dto: CheckUserDto): Promise<{ isExist: boolean }> {
        const user = (await this.databaseService.pool.query(`SELECT *
                                                             FROM users
                                                             WHERE email = '${dto.email}'`))[0];
        return {isExist: !!user[0]}; // Возвращает true, если пользователь найден, иначе false
    }

    async deleteUser(id: string) {
        return (await this.databaseService.pool.query(this.commonService.delete(id)))[0];
    }

    async updateImage(dto: {image: string}, id: string) {
        await this.databaseService.pool.query(`UPDATE users SET image = '${dto.image}' WHERE id = ${id}`);
        return (await this.databaseService.pool.query(this.commonService.getByID(id)))[0][0];
    }

    public hashPassword(password: string) {
        const salt: number = +this.configService.get('CRYPT_SALT', 10);
        return hashSync(password, genSaltSync(salt));
    }

}
