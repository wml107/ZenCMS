import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import pkgJson from '../../package.json';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users.module/entities/user.entities';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGard } from './jwtAuth.gard';
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
    JwtAuthGard
  ],
  exports: [
    AuthService,
    JwtAuthGard
  ]
})
export class AuthModule { }
