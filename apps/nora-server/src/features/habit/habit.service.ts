import { Injectable } from '@nestjs/common';
import { CreateHabitDto, UpdateHabitDto } from '@nora/common';
import { Habit, Prisma, PrismaService } from '@nora/db-prisma';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHabitDto): Promise<Habit> {
    return this.prisma.habit.create({
      data,
    });
  }

  async findAll(where: Prisma.HabitWhereInput): Promise<Habit[]> {
    return this.prisma.habit.findMany({ where });
  }

  async findOne(id: number): Promise<Habit | null> {
    return this.prisma.habit.findFirst({ where: { id } });
  }

  async update(data: UpdateHabitDto, where: Prisma.HabitWhereUniqueInput) {
    return this.prisma.habit.update({
      data: {
        ...data,
      },
      where,
    });
  }

  async remove(id: number) {
    return this.prisma.habit.delete({
      where: { id },
    });
  }
}
