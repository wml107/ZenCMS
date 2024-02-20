import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post.module/post.module';
import { ValidationPipe } from './pipes/validate.pipe';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResourceModule } from './resource.module/resource.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StructureModule } from './structure.module/structure.module';
import pkgJson from "../package.json";
import { SiteModule } from './site.module/site.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users.module/users.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { User } from './users.module/entities/user.entities';
import { Role } from './users.module/entities/role.entities';
import { Post } from './post.module/entities/post.entities';
import { RefreshTokenInterceptor } from './interceptor/refreshToken.interceptor';
import { LogRequestInterceptor } from './interceptor/logRequest.interceptor';
import { ReqLog } from './log.module/entities/ReqLog.entities';
import { LogModule } from './log.module/log.module';
import { LogErrorFilter } from './filter/logError.filter';

@Module({
  imports: [
    //全局变量&用户配置
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().min(1).required(),
        DATA_PATH: Joi.string().required(),
        TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    //配置sqlite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: pkgJson.dataPath + '/db.sql',
      entities: [User, Role, Post, ReqLog],
      autoLoadEntities: true,
      synchronize: true,
    }),
    //提供静态资源
    ServeStaticModule.forRoot({
      rootPath: pkgJson.dataPath + '/resource',
      serveRoot: '/resource',
      exclude: [
        'content',
        'htmlPlugin',
      ]
    }),
    SiteModule,
    AuthModule,
    UsersModule,
    ResourceModule,
    StructureModule,
    PostModule,
    LogModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },{
      provide: APP_INTERCEPTOR,
      useClass: RefreshTokenInterceptor
    },{
      provide:APP_INTERCEPTOR,
      useClass: LogRequestInterceptor
    },{
      provide: APP_FILTER,
      useClass: LogErrorFilter
    }
  ],
})
export class AppModule { }
