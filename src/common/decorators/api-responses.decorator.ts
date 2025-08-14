import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function ApiStandardResponses() {
	return applyDecorators(
		ApiResponse({
			status: 400,
			description: 'Bad Request - Invalid input data',
		}),
		ApiResponse({
			status: 401,
			description: 'Unauthorized - Authentication required',
		}),
		ApiResponse({
			status: 403,
			description: 'Forbidden - Insufficient permissions',
		}),
		ApiResponse({
			status: 404,
			description: 'Not Found - Resource not found',
		}),
		ApiResponse({
			status: 500,
			description: 'Internal Server Error',
		}),
	);
}

export function ApiPaginatedResponse(type: any) {
	return applyDecorators(
		ApiResponse({
			status: 200,
			description: 'Paginated results retrieved successfully',
			schema: {
				type: 'object',
				properties: {
					success: { type: 'boolean', example: true },
					message: {
						type: 'string',
						example: 'Data retrieved successfully',
					},
					data: {
						type: 'array',
						items: { $ref: `#/components/schemas/${type.name}` },
					},
					pagination: {
						type: 'object',
						properties: {
							page: { type: 'number', example: 1 },
							limit: { type: 'number', example: 10 },
							total: { type: 'number', example: 100 },
							totalPages: { type: 'number', example: 10 },
						},
					},
					statusCode: { type: 'number', example: 200 },
					timestamp: {
						type: 'string',
						example: '2025-08-14T10:30:00Z',
					},
				},
			},
		}),
	);
}
