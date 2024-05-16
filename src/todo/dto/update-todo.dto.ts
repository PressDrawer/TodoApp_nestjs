import { IsBoolean, IsOptional, IsString } from "class-validator";


export class updateTodoDto{

    @IsOptional()
    @IsString()
    readonly todoitem : string;

    @IsOptional()
    @IsString()
    readonly description : string;

    @IsOptional()
    @IsBoolean()
    readonly iscompleted : boolean;    
}