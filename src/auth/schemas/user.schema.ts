import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop()
    name:string;

    @Prop({unique:[true,'Duplicate email entered']})
    email:string;

    @Prop()
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(User); 