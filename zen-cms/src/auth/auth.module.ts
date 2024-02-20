import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import pkgJson from '../../package.json';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users.module/entities/user.entities';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';
import { Role } from 'src/users.module/entities/role.entities';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule,
    JwtModule.register({ 
      secret: pkgJson.secret,
      signOptions: {
        expiresIn: '43200s'
      }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [
    AuthService,
    JwtAuthGuard
  ]
})
export class AuthModule { }
