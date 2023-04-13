import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  console.log(`Server start on ${PORT} port`);
  await app.listen(PORT, () => console.log(`Server start on ${PORT} port`));
}
bootstrap();
