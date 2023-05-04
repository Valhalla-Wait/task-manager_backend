import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  //ДОбавить схемы графа
  const config = new DocumentBuilder()
    .setTitle('Task-Manager')
    .setDescription('GraphQL API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Server start on ${PORT} port`);
  await app.listen(PORT, () => console.log(`Server start on ${PORT} port`));
}
bootstrap();
