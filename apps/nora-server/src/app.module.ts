import { Module } from '@nestjs/common';
import { TaskModule } from './features/task/task.module';
import { HabitModule } from './features/habit/habit.module';
import { ConfigModule } from './configs/config.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [ConfigModule.register(), TaskModule, HabitModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
