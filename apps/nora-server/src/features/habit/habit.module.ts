import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { PrismaModule } from '@nora/db-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [HabitController],
  providers: [HabitService],
})
export class HabitModule {}
