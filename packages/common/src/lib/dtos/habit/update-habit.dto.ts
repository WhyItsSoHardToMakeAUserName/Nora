import { IsNotEmpty } from 'class-validator';

export class UpdateHabitDto {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  name?: string;

  current_day?: number;
}
