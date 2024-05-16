import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

   /*  @Get()
    async getUsers():Promise<User[]>{
        return this.authService.Findall();
    }

    @Get(':id')
    async getUser(
      @Param('id')
      id:string,
    ):Promise<User>{
        return this.authService.findbyid(id);
    } */

    @Post('/signup')
    async signUp(
        @Body()
        signupDto:SignupDto
    ):Promise<{token:string}>{
        
        return await this.authService.signUp(signupDto);
    }

    
    @Get('/login')
    async login(
        @Body()
        loginDto:LoginDto
    ):Promise<{token:string}>{
        
        return await this.authService.login(loginDto);
    }


}
