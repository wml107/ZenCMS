import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import "reflect-metadata";
import { join } from 'path';
import cookieParser from 'cookie-parser';
import Config from './utils/Config';

//全局变量/配置
const config = new Config();

async function bootstrap() {
  console.log("----------通过组合键Ctrl+C关闭应用----------");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //cookie处理中间件
  app.use(cookieParser());
  //配置前端网页
  app.useStaticAssets(join(__dirname, '../..', 'static'));
  await app.listen(config.getConfig('PORT')); 
}
bootstrap();
