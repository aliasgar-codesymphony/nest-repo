import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Personal_Details } from './typeorm/entities/Personal_Details';
import { Employment_Details } from './typeorm/entities/Employment_Details';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { HelloController } from './hello/hello.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HelloModule,
    UserModule,
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_mysql',
      entities: [User, Personal_Details, Employment_Details],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes('hello');
    //consumer.apply(LoggerMiddleware).forRoutes('user', { path: 'hello', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .exclude('hello/query')
      .forRoutes('user', HelloController);
  }
}
