import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@zapsters/database';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
