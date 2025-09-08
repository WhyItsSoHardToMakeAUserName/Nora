import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { HabitService } from './habit.service';
import { CreateHabitDto, UpdateHabitDto } from '@nora/common';

@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitService.create(createHabitDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.habitService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.habitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHabitDto: UpdateHabitDto
  ) {
    return this.habitService.update(updateHabitDto, { id });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.habitService.remove(id);
  }
}
