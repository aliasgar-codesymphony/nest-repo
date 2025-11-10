import { Module } from '@nestjs/common';
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
      entities: [User, Personal_Details,Employment_Details],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
