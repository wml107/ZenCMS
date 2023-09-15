import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import "reflect-metadata";
import { join } from 'path';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  //配置前端网页
  app.useStaticAssets(join(__dirname, '../..', 'static'));
  await app.listen(80);
}
bootstrap();
