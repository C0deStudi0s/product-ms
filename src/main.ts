import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // transformOptions: {
        // enableImplicitConversion: true,
      // },
    }
  ));
  await app.listen(envs.port);
  logger.log(`Server is running on ${await app.getUrl()}`);
}
bootstrap();
