import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Implement password validation
    const user = await this.usersService.findByEmail(email);
    if (user && password === 'password') {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any): Promise<any> {
    // TODO: Implement password hashing
    const user = await this.usersService.create(userData);
    return this.login(user);
  }
}
