import { Body, Controller,Delete,Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
//import { todo } from 'node:test';
import { createTodoDto } from './dto/create-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';
@Controller('todos')
export class TodoController {
    constructor(private todoservice:TodoService){

    }

    @Get()
    async getalltodos():Promise<Todo[]>{
        return this.todoservice.Findall();
    }

    @Post()
    async createTodo(
      @Body()
      todo:createTodoDto,
    ):Promise<Todo>{
        return this.todoservice.create(todo);
    }

    @Get(':id')
    async getTodo(
      @Param('id')
      id:string,
    ):Promise<Todo>{
        return this.todoservice.findbyid(id);
    }

    @Put(':id')
    async updateTodo(
        @Param('id')
        id:string,
        @Body()
        todo:updateTodoDto,
    ):Promise<Todo>
    {
        return this.todoservice.updatetodo(id,todo);
    }

    @Delete(':id')
    async deleteTodo(
      @Param('id')
      id:string,
    ):Promise<Todo>{
        return await this.todoservice.deleteByid(id);
    }

}
