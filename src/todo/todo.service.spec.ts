import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken, } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import {Model} from 'mongoose';
import mongoose from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  
  let todoservice : TodoService;
  let model : Model<Todo>;

  const mockTodo = {
    _id: '6644f09560d93e20edcb3b8e',
    todoitem: 'Read a book',
    description: 'Reading makes healthy mind',
    iscompleted: false,
    };

  const mockTodoService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide:getModelToken(Todo.name),
          useValue:mockTodoService
        }
      ],
    }).compile();

    todoservice = module.get<TodoService>(TodoService);
    model = module.get<Model<Todo>>(getModelToken(Todo.name));
  });

  //Test findall() in todoservice.ts
  describe('findAll', () => {
    it('should return an array of books', async () => {
      const query = { page: '1'};

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockTodo]),
            }),
          } as any),
      );

      const result = await todoservice.findall(query);

      expect(model.find).toHaveBeenCalledWith();

      expect(result).toEqual([mockTodo]);
    });
  });

  //test findById() method in todoservice.ts
  describe('findById', () => {
    it('should find and return a book by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockTodo);

      const result = await todoservice.findbyid(mockTodo._id);

      expect(model.findById).toHaveBeenCalledWith(mockTodo._id);
      expect(result).toEqual(mockTodo);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(todoservice.findbyid(id)).rejects.toThrow(
        BadRequestException,
      );

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(todoservice.findbyid(mockTodo._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockTodo._id);
    });
  });

  // test updatetodo method in todoservice.ts
  describe('updateById', () => {
    const todo = { todoitem: 'Updated todo item' };
    it('should update and return a todo', async () => {
      const updatedTodo = { ...mockTodo, todoitem: 'Updated todo item' };
      const todo = { todoitem: 'Updated todo item' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedTodo);

      const result = await todoservice.updatetodo(mockTodo._id, todo as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockTodo._id, todo, {
        new: true,
        runValidators: true,
      });

      expect(result.todoitem).toEqual(todo.todoitem);
    });

   
  });

   // test deletetodo method in todoservice.ts
  describe('deleteById', () => {
    
      it('should delete and return a book', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockTodo);

      const result = await todoservice.deleteByid(mockTodo._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockTodo._id);

      expect(result).toEqual(mockTodo);
    });
   });
});
