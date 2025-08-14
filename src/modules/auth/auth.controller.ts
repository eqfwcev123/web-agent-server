import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOperation({ summary: 'User login' })
	@ApiResponse({
		status: 200,
		description: 'Login successful',
		type: AuthResponseDto,
	})
	@ApiResponse({ status: 401, description: 'Invalid credentials' })
	async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
		const user = await this.authService.validateUser(
			loginDto.email,
			loginDto.password,
		);
		if (!user) {
			throw new Error('Invalid credentials');
		}
		return this.authService.login(user);
	}

	@Post('register')
	@ApiOperation({ summary: 'User registration' })
	@ApiResponse({
		status: 201,
		description: 'Registration successful',
		type: AuthResponseDto,
	})
	@ApiResponse({ status: 400, description: 'Validation error' })
	async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
		return this.authService.register(registerDto);
	}
}
