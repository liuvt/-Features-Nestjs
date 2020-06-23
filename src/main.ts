import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module';
import { join } from 'path';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', '/src/views'),
  })

  await app.listen(5000);
}

bootstrap().then(() => logger.verbose(`Feature DEMO (HTTP)- URL: http://localhost:5000`));
