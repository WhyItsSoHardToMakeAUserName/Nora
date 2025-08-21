import { IsDate, IsNotEmpty } from 'class-validator';
import { Importance, WeekDay } from 'src/lib/enums';

export class CreateTaskDto {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  name!: string;

  description?: string;

  repeat_days?: WeekDay[];

  importance?: Importance;

  @IsDate()
  start_time?: Date;

  @IsDate()
  end_time?: Date;
}
