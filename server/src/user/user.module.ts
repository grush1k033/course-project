import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Module({
  providers: [
    UserService,
    DatabaseService,
    { provide: CommonService, useValue: new CommonService('users') },
  ],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
