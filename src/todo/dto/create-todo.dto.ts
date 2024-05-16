import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class createTodoDto{
    @IsNotEmpty()
    @IsString()
    readonly todoitem : string;

    @IsString()
    readonly description : string;

    @IsNotEmpty()
    @IsBoolean()
    readonly iscompleted : boolean;    
}