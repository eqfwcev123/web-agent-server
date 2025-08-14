export interface ProblemAnalysisRequest {
	problemText: string;
	language?: string;
	userLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface ProblemAnalysisResponse {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	description: string;
	hints: string[];
	suggestedApproach: string;
	timeComplexity: string;
	spaceComplexity: string;
	testCases: TestCase[];
}

export interface TestCase {
	input: string;
	expectedOutput: string;
	explanation?: string;
}

export interface AIExplanationRequest {
	problemId: string;
	code?: string;
	specificQuestion?: string;
	context?: 'explanation' | 'debugging' | 'optimization' | 'hint';
}

export interface AIExplanationResponse {
	explanation: string;
	codeAnalysis?: CodeAnalysis;
	suggestions: string[];
	nextSteps: string[];
}

export interface CodeAnalysis {
	correctness: number;
	efficiency: number;
	readability: number;
	issues: CodeIssue[];
	improvements: string[];
}

export interface CodeIssue {
	line: number;
	type: 'error' | 'warning' | 'suggestion';
	message: string;
	severity: 'high' | 'medium' | 'low';
}
