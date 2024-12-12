import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const clientUrl = config.get('CLIENT_URL');
  app.enableCors({
    origin: [clientUrl],
    credentials: true
  })
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('Server on PORT: ' + 3000);
});
