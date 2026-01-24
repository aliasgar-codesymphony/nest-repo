import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HelloModule } from 'src/hello/hello.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Personal_Details } from 'src/typeorm/entities/Personal_Details';
import { Employment_Details } from 'src/typeorm/entities/Employment_Details';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';

@Module({
  imports: [
    HelloModule,
    TypeOrmModule.forFeature([User, Personal_Details, Employment_Details]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
