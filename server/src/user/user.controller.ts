import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CheckUserDto, IUserDto} from "../Interfaces/interfaces";
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService,private db: DatabaseService, private cm: CommonService) {}

    @Get()
    async getAllUser() {
        return await this.userService.getAllUser();
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.userService.getUser(id);
    }

    @Post()
    async addUser(@Body() dto: IUserDto) {
        return await this.userService.addUser(dto);
    }

    @Post('exists')
    async checkUserExists(@Body() checkUserDto: CheckUserDto): Promise<{isExist: boolean}> {
        return await this.userService.doesUserExist(checkUserDto);
    }

}
