import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {CheckUserDto, IUserDto} from "../Interfaces/interfaces";

@Injectable()
export class UserService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService
    ) {}

    async addUser(dto: IUserDto) {
        await this.databaseService.pool.query(this.commonService.create<IUserDto>(dto));
        return dto;
    }

    async doesUserExist(dto: CheckUserDto): Promise<{isExist: boolean}> {

            const user = (await this.databaseService.pool.query(`SELECT * FROM users WHERE email ='${dto.email}'`))[0];


        return {isExist: !!user[0]}; // Возвращает true, если пользователь найден, иначе false
    }

}
