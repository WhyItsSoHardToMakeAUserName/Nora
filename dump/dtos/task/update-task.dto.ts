import { IsDate, IsNotEmpty } from 'class-validator';
import { Importance, TaskStatus, WeekDay } from 'src/lib/enums';

export class UpdateTaskDto {
  @IsNotEmpty()
  name!: string;

  description?: string;

  status?: TaskStatus;

  repeat_days?: WeekDay[];

  importance?: Importance;

  @IsDate()
  start_time?: Date;

  @IsDate()
  end_time?: Date;
}
