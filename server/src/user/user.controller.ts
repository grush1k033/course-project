import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CheckUserDto, IUserDto} from "../Interfaces/interfaces";
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService,private db: DatabaseService, private cm: CommonService) {}


    // @Get('virtual')
    // async testVirtual() {
    //     return await this.db.pool2.query("SELECT * FROM dbo.PersonPhone");
    // }

    @Post()
    async addUser(@Body() dto: IUserDto) {
        return await this.userService.addUser(dto);
    }

    @Post('exists')
    async checkUserExists(@Body() checkUserDto: CheckUserDto): Promise<{isExist: boolean}> {
        return await this.userService.doesUserExist(checkUserDto);
    }

}
