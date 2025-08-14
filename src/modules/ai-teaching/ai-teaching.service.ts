import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiRequestDto } from './dto/ai-request.dto';
import { AiResponseDto, AIExplanationResponseDto } from './dto/ai-response.dto';
import OpenAI from 'openai';

@Injectable()
export class AiTeachingService {
	private readonly logger = new Logger(AiTeachingService.name);
	private readonly openai: OpenAI;

	constructor(private configService: ConfigService) {
		const apiKey = this.configService.get<string>('ai.openaiApiKey');
		if (apiKey) {
			this.openai = new OpenAI({
				apiKey: apiKey,
			});
		} else {
			this.logger.warn(
				'OpenAI API key not configured. AI features will use mock responses.',
			);
		}
	}

	async generateHint(request: AiRequestDto): Promise<AiResponseDto> {
		const startTime = Date.now();

		try {
			if (!this.openai) {
				return this.getMockResponse('hint', startTime);
			}

			const prompt = this.buildHintPrompt(request);
			const completion = await this.openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'You are an expert programming tutor. Provide helpful, educational hints that guide students toward the solution without giving it away completely.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				max_tokens: 300,
				temperature: 0.7,
			});

			const content =
				completion.choices[0]?.message?.content ||
				'Unable to generate hint';

			return {
				content,
				type: 'hint',
				confidence: 0.8,
				metadata: {
					responseTime: Date.now() - startTime,
					model: completion.model,
					usage: completion.usage,
				},
			};
		} catch (error) {
			this.logger.error('Error generating AI hint:', error);
			return this.getMockResponse('hint', startTime);
		}
	}

	async explainConcept(request: AiRequestDto): Promise<AiResponseDto> {
		const startTime = Date.now();

		try {
			if (!this.openai) {
				return this.getMockResponse('explanation', startTime);
			}

			const prompt = this.buildConceptPrompt(request);
			const completion = await this.openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'You are an expert programming educator. Explain programming concepts clearly with examples, analogies, and practical applications.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				max_tokens: 500,
				temperature: 0.5,
			});

			const content =
				completion.choices[0]?.message?.content ||
				'Unable to explain concept';

			return {
				content,
				type: 'explanation',
				confidence: 0.9,
				metadata: {
					responseTime: Date.now() - startTime,
					model: completion.model,
					usage: completion.usage,
				},
			};
		} catch (error) {
			this.logger.error('Error generating concept explanation:', error);
			return this.getMockResponse('explanation', startTime);
		}
	}

	async reviewCode(request: AiRequestDto): Promise<AiResponseDto> {
		const startTime = Date.now();

		try {
			if (!this.openai) {
				return this.getMockResponse('code_review', startTime);
			}

			const prompt = this.buildCodeReviewPrompt(request);
			const completion = await this.openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'You are an expert code reviewer. Provide constructive feedback on code quality, efficiency, readability, and potential improvements. Be encouraging and educational.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				max_tokens: 600,
				temperature: 0.3,
			});

			const content =
				completion.choices[0]?.message?.content ||
				'Unable to review code';

			return {
				content,
				type: 'code_review',
				confidence: 0.85,
				metadata: {
					responseTime: Date.now() - startTime,
					model: completion.model,
					usage: completion.usage,
				},
			};
		} catch (error) {
			this.logger.error('Error generating code review:', error);
			return this.getMockResponse('code_review', startTime);
		}
	}

	async provideFeedback(request: AiRequestDto): Promise<AiResponseDto> {
		const startTime = Date.now();

		try {
			if (!this.openai) {
				return this.getMockResponse('feedback', startTime);
			}

			const prompt = this.buildFeedbackPrompt(request);
			const completion = await this.openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'You are a supportive programming mentor. Provide encouraging, specific feedback that helps students learn and improve. Focus on both strengths and areas for growth.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				max_tokens: 400,
				temperature: 0.6,
			});

			const content =
				completion.choices[0]?.message?.content ||
				'Unable to provide feedback';

			return {
				content,
				type: 'feedback',
				confidence: 0.9,
				metadata: {
					responseTime: Date.now() - startTime,
					model: completion.model,
					usage: completion.usage,
				},
			};
		} catch (error) {
			this.logger.error('Error generating feedback:', error);
			return this.getMockResponse('feedback', startTime);
		}
	}

	// Legacy methods for backward compatibility
	async explainProblem(problemId: string): Promise<AIExplanationResponseDto> {
		return {
			explanation: `AI explanation for problem ${problemId}`,
			suggestions: [
				'Study the problem requirements',
				'Break down into steps',
			],
			nextSteps: [
				'Practice similar problems',
				'Review algorithm concepts',
			],
			timestamp: new Date(),
		};
	}

	async analyzeCode(code: string, language: string): Promise<any> {
		return {
			correctness: 0,
			suggestions: [],
			improvements: [],
		};
	}

	async getHint(
		problemId: string,
		userProgress: any,
	): Promise<AIExplanationResponseDto> {
		return {
			explanation: `Hint for problem ${problemId}`,
			suggestions: [
				'Consider the problem constraints',
				'Think about edge cases',
			],
			nextSteps: ['Try a different approach', 'Review similar problems'],
			timestamp: new Date(),
		};
	}

	private buildHintPrompt(request: AiRequestDto): string {
		const { problemContext, userCode, sessionContext } = request;

		return `
Problem: ${problemContext.title}
Difficulty: ${problemContext.difficulty}
Description: ${problemContext.description}

Student's current code:
\`\`\`${sessionContext?.language || 'javascript'}
${userCode || 'No code provided yet'}
\`\`\`

Previous hints used: ${sessionContext?.hintsUsed || 0}
Attempts made: ${sessionContext?.attempts || 0}

Please provide a helpful hint that guides the student toward the solution without giving it away completely. 
Consider their current code and progress level.
`;
	}

	private buildConceptPrompt(request: AiRequestDto): string {
		const { problemContext, conceptToExplain } = request;

		return `
Please explain the programming concept: "${conceptToExplain}"

Context: This explanation is for a student working on the problem "${problemContext.title}" 
(Difficulty: ${problemContext.difficulty}, Category: ${problemContext.category}).

Provide a clear explanation with:
1. Definition of the concept
2. Why it's important
3. How it applies to this problem
4. A simple example
5. Common pitfalls to avoid
`;
	}

	private buildCodeReviewPrompt(request: AiRequestDto): string {
		const { problemContext, userCode, sessionContext } = request;

		return `
Please review this code for the problem: ${problemContext.title}

Student's code:
\`\`\`${sessionContext?.language || 'javascript'}
${userCode}
\`\`\`

Problem requirements:
${problemContext.description}

Please provide feedback on:
1. Correctness and logic
2. Code quality and readability
3. Efficiency and optimization opportunities
4. Best practices and style
5. Specific suggestions for improvement

Be constructive and educational in your feedback.
`;
	}

	private buildFeedbackPrompt(request: AiRequestDto): string {
		const { problemContext, userCode, sessionContext, executionResult } =
			request;

		return `
Student worked on: ${problemContext.title}
Their final code:
\`\`\`${sessionContext?.language || 'javascript'}
${userCode}
\`\`\`

Execution result: ${executionResult ? JSON.stringify(executionResult) : 'Not provided'}
Attempts made: ${sessionContext?.attempts || 0}
Hints used: ${sessionContext?.hintsUsed || 0}

Please provide encouraging, specific feedback that:
1. Acknowledges their effort and progress
2. Highlights what they did well
3. Suggests areas for improvement
4. Encourages continued learning
5. Provides next steps or related concepts to explore

Keep the tone positive and motivational.
`;
	}

	private getMockResponse(type: string, startTime: number): AiResponseDto {
		const mockResponses = {
			hint: 'Try breaking down the problem into smaller steps. Consider what data structure might help you track information efficiently.',
			explanation:
				'This concept involves understanding how to efficiently search and store data. Think about the relationship between keys and values.',
			code_review:
				'Your code shows good understanding of the basic approach. Consider edge cases and think about time complexity optimization.',
			feedback:
				"Great effort on this problem! You're making good progress. Keep practicing similar problems to strengthen your understanding.",
		};

		return {
			content: mockResponses[type] || 'Mock AI response',
			type: type as any,
			confidence: 0.7,
			metadata: {
				responseTime: Date.now() - startTime,
				model: 'mock-model',
				note: 'This is a mock response. Configure OpenAI API key for real AI responses.',
			},
		};
	}
}
