import { Module } from '@nestjs/common';
import Config from './utils/Config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post.module/post.module';
import { ValidationPipe } from './pipes/validate.pipe';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResourceModule } from './resource.module/resource.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { StructureModule } from './structure.module/structure.module';
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

//全局变量&用户配置
const config = new Config();

@Module({
  imports: [
    //配置sqlite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: config.getConfig('DATA_PATH') + '/db.sql',
      entities: [User, Role, Post, ReqLog],
      autoLoadEntities: true,
      synchronize: true,
    }),
    //提供静态资源
    ServeStaticModule.forRoot({
      rootPath: config.getConfig('DATA_PATH') + '/resource',
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
