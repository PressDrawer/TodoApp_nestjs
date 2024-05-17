import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(Todo.name)
        private toodoModel: mongoose.Model<Todo>
    ){}
    
    async Findall(query:Query):Promise<Todo[]>{

        const resPerPage = 3;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage*(currentPage-1);

        const todos = await this.toodoModel
        .find()
        .limit(resPerPage)
        .skip(skip)
        return todos;
    }

    async create(todo:Todo):Promise<Todo>{
     const res = await this.toodoModel.create(todo);
     return res;       
    }

    async findbyid(id:string):Promise<Todo>{

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId)
            {
                throw new BadRequestException('Please enter correct id');
            }

        const todo = await this.toodoModel.findById(id);
        if(!todo)
        {
            throw new NotFoundException('todo not found')
        }
        return todo;
    }

    async updatetodo(id:string,todo:Todo):Promise<Todo>{

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId)
        {
            throw new BadRequestException('Please enter correct id');
        }

        const _todo = await this.toodoModel.findById(id);
        if(!_todo)
        {
            throw new NotFoundException('todo not found')
        }
    

        return await this.toodoModel.findByIdAndUpdate(id,todo,{
            new:true,
            runValidators:true
        });
    }
    
    async deleteByid(id:string):Promise<Todo>{

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId)
            {
                throw new BadRequestException('Please enter correct id');
            }

         const todo = await this.toodoModel.findById(id);
        if(!todo)
        {
            throw new NotFoundException('todo not found')
        }

       return await this.toodoModel.findByIdAndDelete(id);
       
    }
}
