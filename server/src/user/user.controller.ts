import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {CheckUserDto, IUserDto} from "../Interfaces/interfaces";
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import { Public } from '../auth/public.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,private db: DatabaseService, private cm: CommonService) {}


    @Get('mail')
    async getUserByEmail(@Query('email') email: string) {
        return await this.userService.getUserByEmail(email);
    }
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

    @Public()
    @Post('exists')
    async checkUserExists(@Body() checkUserDto: CheckUserDto): Promise<{isExist: boolean}> {
        return await this.userService.doesUserExist(checkUserDto);
    }

    @Patch(':id')
    async updateImage(@Body() dto: {image: string}, @Param('id') id: string) {
         return await this.userService.updateImage(dto, id);
    }


    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }

}
