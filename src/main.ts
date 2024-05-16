import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Rest Api Todo')
  .setDescription('')
  .setVersion('1.0')
  .addTag('todos')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/',app,document)

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);



}
bootstrap();
