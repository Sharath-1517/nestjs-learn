import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { DatabaseModule } from './database/database.module';
// import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [UsersModule /* DatabaseModule, EmployeesModule,*/],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
