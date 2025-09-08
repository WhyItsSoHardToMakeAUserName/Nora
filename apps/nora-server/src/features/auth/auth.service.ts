import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from 'packages/common/src/lib/dtos/user';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(user: RegisterDto) {
    this.userService.createUser(user);
    return;
  }

  async login(user: LoginDto) {
    const User = await this.userService.getUserByEmail(user.email);

    if (!User) throw new Error('User not found');

    return compare(user.password, User.password);
  }
}
