import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  JwtPayload,
  LoginDto,
  RegisterDto,
} from 'packages/common/src/lib/dtos/user';
import { compare } from 'bcryptjs';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { CacheService } from '../../cache/cache.service';
import { randomInt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailSender: MailSenderService,
    private readonly cacheService: CacheService,
    private readonly jwtService: JwtService
  ) {}
  async register(user: RegisterDto) {
    await this.userService.createUser(user);
    return this.signJwt({ email: user.email, name: user.name });
  }

  async login(user: LoginDto) {
    const User = await this.validateUserByEmail(user.email, user.password);

    return this.signJwt({ email: User.email, name: User.name });
  }

  async sendOneTimePasscode(email: string) {
    const oneTimePasscode = randomInt(1000, 9999).toString();

    this.cacheService.set('otp:' + email, oneTimePasscode, 300);

    await this.mailSender.sendEmail({
      to: email,
      ...(await this.mailSender.oneTimePasscodeEmailOptions(oneTimePasscode)),
    });
  }

  async validateOneTimePasscode(otp: string, email: string) {
    const cachedOTP = await this.cacheService.get('otp:' + email);

    if (cachedOTP === otp) return;

    throw new UnauthorizedException('Invalid one time passcode');
  }

  async validateUserByEmail(email: string, password: string) {
    const User = await this.userService.getUserByEmail(email);

    if (!User) throw new NotFoundException('User not found');

    if (await compare(password, User.password)) {
      return User;
    }

    throw new UnauthorizedException('Invalid password');
  }

  async signJwt(payload: JwtPayload) {
    return this.jwtService.signAsync(payload);
  }
}
