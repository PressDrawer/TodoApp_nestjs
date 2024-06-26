import { Body, Controller,Delete,Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
//import { todo } from 'node:test';
import { createTodoDto } from './dto/create-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('todos')
export class TodoController {
    constructor(private todoservice:TodoService){

    }

    //endpoint for get all todos
    @Get()
    async getalltodos(@Query() query:ExpressQuery):Promise<Todo[]>{
        return this.todoservice.findall(query);
    }

    //endpoint for create a todo
    @Post()
    @UseGuards(AuthGuard())
    async createTodo(
      @Body()
      todo:createTodoDto,
    ):Promise<Todo>{
        return this.todoservice.create(todo);
    }

    //endpoint for get a todo by id
    @Get(':id')
    async getTodo(
      @Param('id')
      id:string,
    ):Promise<Todo>{
        return this.todoservice.findbyid(id);
    }

    //endpoint for update a todo
    @Put(':id')
    @UseGuards(AuthGuard())
    async updateTodo(
        @Param('id')
        id:string,
        @Body()
        todo:updateTodoDto,
    ):Promise<Todo>
    {
        return this.todoservice.updatetodo(id,todo);
    }

    //endpoint for delete a todo
    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteTodo(
      @Param('id')
      id:string,
    ):Promise<Todo>{
        return await this.todoservice.deleteByid(id);
    }

}
