import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@nora/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register/:otp')
  async register(@Body() user: RegisterDto) {
    try {
      await this.authService.validateOneTimePasscode(user.otp, user.email);

      return this.authService.register(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('otp/')
  sendOTP(@Body() email: string) {
    return this.authService.sendOneTimePasscode(email);
  }
}
