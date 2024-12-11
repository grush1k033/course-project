import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [' http://localhost:4200', 'https://inquisitive-dasik-5ebded.netlify.app/main'],
    credentials: true
  })
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('Server on PORT: ' + 3000);
});
