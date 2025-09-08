import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Importance, TaskStatus, WeekDay } from 'src/lib/enums';

export class UpdateTaskDto {
  @IsNotEmpty()
  name!: string;

  description?: string;

  status?: TaskStatus;

  repeat_days?: WeekDay[];

  importance?: Importance;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_time?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_time?: Date;
}
