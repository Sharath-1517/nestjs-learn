import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // const request = context.switchToHttp().getRequest();

    // console.log(Promise.resolve(request.route));
    console.log("Users guard is being executed...");
    return true;
  }
}
