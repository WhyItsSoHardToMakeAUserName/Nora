import { Injectable } from '@nestjs/common';
import { common, CreateTaskDto, UpdateTaskDto } from '@nora/common';
import { Prisma, PrismaService, Task } from '@nora/db-prisma';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
      },
    });
  }

  async tasks(where: Prisma.TaskWhereInput): Promise<Task[]> {
    common();
    return this.prisma.task.findMany({ where });
  }

  async getTask(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({ where: { id } });
  }

  async updateTask(data: UpdateTaskDto, where: Prisma.TaskWhereUniqueInput) {
    return this.prisma.task.update({
      data: {
        ...data,
      },
      where,
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
