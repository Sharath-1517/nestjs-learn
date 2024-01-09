import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// Middleware
// import { LoggerMiddleware } from './middlewares/logger.middleware';

// Using prisma(deleted the files, the database api keys are in passcode.txt located in the root)
// import { DatabaseModule } from './database/database.module';
// import { EmployeesModule } from './employees/employees.module';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule /* DatabaseModule, EmployeesModule,*/,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
