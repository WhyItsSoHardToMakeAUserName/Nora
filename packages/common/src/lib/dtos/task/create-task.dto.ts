import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Importance, WeekDay } from 'src/lib/enums';

export class CreateTaskDto {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  name!: string;

  description?: string;

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
