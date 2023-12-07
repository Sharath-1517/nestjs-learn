import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMiddleware } from 'src/middlewares/users.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)

      // The below commented code will exclude all the path that follows with the 'users' prefix(used regex below)
      // .exclude('users/(.*)')
      // .forRoutes('users');

      // The below code will execute whatever happens in the users path
      .forRoutes('users');
  }
}
