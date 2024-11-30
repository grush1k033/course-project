import { Inject, Module } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { config } from 'process';
import { audit } from 'rxjs';
import { AppService } from './app.service';
const mailerOptions = (config: ConfigService) : MailerOptions => ({
  transport: {
    host: config.get('SMTP_HOST') || "smtp.gmail.com",
    auth: {
      user: config.get('SMTP_USER') || 'grushevskiy.yevgeniy@gmail.com',
      pass: config.get('SMTP_PASSWORD') || 'Unypyrebe333kdk@m@'
    }
  }
})

export const options = () => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => mailerOptions(config)
})

@Module({
  imports: [
    ShopModule,
    CategoryModule,
    ModelsModule,
    MarksModule,
    AutoPartModule,
    MailerModule.forRootAsync(options()),
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
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}

