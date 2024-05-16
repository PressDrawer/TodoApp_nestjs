import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps:true,
})

export class Todo{

    @Prop()
    todoitem : string;

    @Prop()
    description : string;

    @Prop()
    iscompleted : boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo)

