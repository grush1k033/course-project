import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseService } from './services/database.service';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { ModelsModule } from './models/models.module';
import { MarksModule } from './marks/marks.module';
import { AutoPartModule } from './auto-part/auto-part.module';
import { CarModule } from './car/car.module';
import { BasketModule } from './basket/basket.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ShopModule,
    CategoryModule,
    ModelsModule,
    MarksModule,
    AutoPartModule,
    CarModule,
    BasketModule,
    UserModule,
    MulterModule.register({
      dest: './uploads',
    }),
    FilesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}
