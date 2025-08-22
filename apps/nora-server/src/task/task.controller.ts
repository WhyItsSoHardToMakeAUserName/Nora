import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from '@nora/common';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.taskService.tasks({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.getTask(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(updateTaskDto, { id });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
