import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Library example')
    .setDescription('The library API description')
    .setVersion('1.0')
    .addTag('books', 'A REST API for a library')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'jwt', in: 'header' },
      'access-token',
    )
    .addBasicAuth({ type: 'http', scheme: 'basic' })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  console.log(document)

  await app.listen(3000)
}

bootstrap()
