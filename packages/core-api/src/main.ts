import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: ['GET', 'POST'], // Enable HTTP methods
    allowedHeaders: ['Content-Type'], // Allow headers
    credentials: true,
  })
  await app.listen(3300)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
