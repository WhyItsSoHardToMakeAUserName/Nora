import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@nora/db-prisma';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...user,
        password: await hash(user.password, 10),
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: string, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
