import { IsNotEmpty } from 'class-validator';

export class CreateHabitDto {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  name!: string;
}
