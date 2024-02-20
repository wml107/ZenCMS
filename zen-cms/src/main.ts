import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import "reflect-metadata";
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log("----------通过组合键Ctrl+C关闭应用----------");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //先拿到全局变量
  const configService = app.get(ConfigService);

  //cookie处理中间件
  app.use(cookieParser());
  //配置前端网页
  app.useStaticAssets(join(__dirname, '../..', 'static'));
  await app.listen(configService.get('PORT')); 
}
bootstrap();
