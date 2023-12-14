import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<
  'ENGINEER' | 'ADMIN' | 'SUPER_ADMIN'
>();
