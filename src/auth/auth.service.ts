import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Mode } from 'fs';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService:JwtService
    ){}

    //Register a user and return the token.....................
    async signUp(signupdto:SignupDto):Promise<{token:string}>{
        const {name,email,password}=signupdto
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await this.userModel.create({
            name,
            email,
            password:hashedPassword
        })
        user;
        const token = this.jwtService.sign({id:user._id})
        return {token};
    }

    //Login user............................................
    async login(LoginDto:LoginDto):Promise<{token:string}>{
        const {email,password} = LoginDto
        
        const user = await this.userModel.findOne({ email })

        if(!user){
            throw new UnauthorizedException('Invalid username')
        }
        user.password
        const isPasswordMatched = await bcrypt.compare(password,user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('invalid password')
        }

        const token = this.jwtService.sign({id:user._id})
        return {token};    
    }

    async Findall():Promise<User[]>{
        const users = await this.userModel.find();

        return users;
    }

    async findbyid(id:string):Promise<User>{
        const user = await this.userModel.findById(id);
       
        return user;
    }
}
