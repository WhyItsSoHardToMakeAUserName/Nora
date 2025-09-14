import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConfig, IAuthConfig } from '../../configs/auth.config';
import { UserModule } from '../user/user.module';
import { MailSenderModule } from '../mail-sender/mail-sender.module';

@Module({
  imports: [
    UserModule,
    //   JwtModule.registerAsync({
    //     useFactory: () => ({
    //       secret: 'secret',
    //       // signOptions: { expiresIn: config.jwt.expiresIn },
    //     }),
    //     // inject: [authConfig.KEY],
    //   }),
    MailSenderModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
