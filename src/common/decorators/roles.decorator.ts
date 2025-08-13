import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Usage examples:
// @Roles('admin')
// @Roles('admin', 'moderator')
// @Roles('user')
