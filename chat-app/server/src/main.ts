import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('NestJS Chat with Prisma + Socket.IO')
    .setVersion('1.0')
    .addBearerAuth()   // if you add auth later
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: "http://localhost:3000",   // 👈 your Next.js app
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
