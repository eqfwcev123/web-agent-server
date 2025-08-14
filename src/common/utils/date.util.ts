export class DateUtil {
	/**
	 * Get the start of today
	 */
	static getStartOfDay(date: Date = new Date()): Date {
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);
		return startOfDay;
	}

	/**
	 * Get the end of today
	 */
	static getEndOfDay(date: Date = new Date()): Date {
		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);
		return endOfDay;
	}

	/**
	 * Add days to a date
	 */
	static addDays(date: Date, days: number): Date {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	/**
	 * Check if a date is today
	 */
	static isToday(date: Date): boolean {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	/**
	 * Format duration in milliseconds to human readable format
	 */
	static formatDuration(milliseconds: number): string {
		const seconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);

		if (hours > 0) {
			return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
		} else if (minutes > 0) {
			return `${minutes}m ${seconds % 60}s`;
		} else {
			return `${seconds}s`;
		}
	}

	/**
	 * Get relative time string (e.g., "2 hours ago")
	 */
	static getRelativeTime(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffSeconds = Math.floor(diffMs / 1000);
		const diffMinutes = Math.floor(diffSeconds / 60);
		const diffHours = Math.floor(diffMinutes / 60);
		const diffDays = Math.floor(diffHours / 24);

		if (diffDays > 0) {
			return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
		} else if (diffHours > 0) {
			return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
		} else if (diffMinutes > 0) {
			return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
		} else {
			return 'Just now';
		}
	}
}
