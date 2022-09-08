import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { createLogger, enableLoggerInstance, enableDebugger } from 'logger';

import { AppModule } from './app.module';
import loggerConfig from './config/loggerConfig';
import configurations from './config/configuration';
import { config } from './libs/documentation/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const logInstance = createLogger.createLogInstance(loggerConfig);
  app.use(
    enableLoggerInstance(logInstance, [
      { location: 'headers', key: 'x-trace-id' },
    ]),
  );
  enableDebugger(app, logInstance);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configurations.port);
}
bootstrap();
