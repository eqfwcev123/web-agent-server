import * as bcrypt from 'bcryptjs';

export class HashUtil {
	private static readonly SALT_ROUNDS = 12;

	/**
	 * Hash a password using bcrypt
	 */
	static async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, this.SALT_ROUNDS);
	}

	/**
	 * Compare a plain text password with a hashed password
	 */
	static async comparePassword(
		plainPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}

	/**
	 * Generate a random string for tokens
	 */
	static generateRandomString(length: number = 32): string {
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	}

	/**
	 * Generate a secure random token
	 */
	static generateToken(): string {
		return this.generateRandomString(64);
	}
}
