import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import mongoose from 'mongoose';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(Todo.name)
        private toodoModel: mongoose.Model<Todo>
    ){}
    
    async Findall():Promise<Todo[]>{
        const todos = await this.toodoModel.find()
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

        return await this.toodoModel.findByIdAndUpdate(id,todo,{
            new:true,
            runValidators:true
        });
    }
    
    async deleteByid(id:string):Promise<Todo>{
       return await this.toodoModel.findByIdAndDelete(id);
       
    }
}
