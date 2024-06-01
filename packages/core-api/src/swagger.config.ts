import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Pluton API 🚀🚀')
    .setDescription('Pluton API Documentation 📝📝')
    .addServer('/')
    .addServer('/')
    .addBearerAuth()
    .addBasicAuth()
    .setVersion('0.0.1')
    .addGlobalParameters({
      in: 'header',
      required: true,
      name: 'current-role',
      schema: {
        example: 'school-admin',
      },
    })
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
