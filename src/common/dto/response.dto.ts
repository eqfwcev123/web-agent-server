import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
	@ApiProperty()
	success: boolean;

	@ApiProperty()
	message: string;

	@ApiProperty()
	data?: T;

	@ApiProperty()
	statusCode: number;

	@ApiProperty()
	timestamp: string;

	constructor(
		success: boolean,
		message: string,
		data?: T,
		statusCode: number = 200,
	) {
		this.success = success;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
		this.timestamp = new Date().toISOString();
	}
}

export class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
	@ApiProperty()
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};

	constructor(
		data: T[],
		total: number,
		page: number,
		limit: number,
		message: string = 'Data retrieved successfully',
	) {
		super(true, message, data);
		this.pagination = {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		};
	}
}
