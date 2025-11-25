import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  exports: [HelloService],
})
export class HelloModule {
  
}
