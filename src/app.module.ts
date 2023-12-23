import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { DatabaseModule } from './database/database.module';
// import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule /* DatabaseModule, EmployeesModule,*/, AuthModule, ConfigModule.forRoot({
    envFilePath: '.env.development',
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
