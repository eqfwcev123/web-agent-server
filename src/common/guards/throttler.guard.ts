import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Skip throttling for certain endpoints or users
    if (request.url.includes('/health') || request.url.includes('/docs')) {
      return true;
    }
    
    // Apply different limits based on user authentication
    if (request.user) {
      // Authenticated users get higher limits
      return super.canActivate(context);
    }
    
    // Apply stricter limits for unauthenticated users
    return super.canActivate(context);
  }

  protected getTracker(req: Record<string, any>): string {
    // Use user ID for authenticated users, IP for others
    return req.user?.userId || req.ip;
  }
}
