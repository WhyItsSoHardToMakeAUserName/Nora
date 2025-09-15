import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from 'packages/common/src/lib/dtos/user';
import { compare } from 'bcryptjs';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailSender: MailSenderService,
    private readonly cacheService: CacheService
  ) {}
  async register(user: RegisterDto) {
    this.userService.createUser(user);
    return;
  }

  async login(user: LoginDto) {
    const User = await this.userService.getUserByEmail(user.email);

    if (!User) throw new Error('User not found');

    return compare(user.password, User.password);
  }

  async sendOTP(email: string) {
    this.cacheService.set('otp-' + email, '9264', 300);

    this.mailSender.sendEmail({
      to: email,
      ...(await this.mailSender.oneTimePasscodeEmailOptions('9264')),
    });
  }
}
