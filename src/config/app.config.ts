import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  environment: string;
  frontendUrl: string;
  apiPrefix: string;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.PORT || '3000', 10),
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    apiPrefix: process.env.API_PREFIX || 'api',
  }),
);

export interface AIConfig {
  openaiApiKey: string;
  anthropicApiKey: string;
  maxTokens: number;
  temperature: number;
}

export const aiConfig = registerAs(
  'ai',
  (): AIConfig => ({
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2000', 10),
    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  }),
);

export interface CodeExecutionConfig {
  judge0ApiUrl: string;
  judge0ApiKey: string;
  timeoutMs: number;
  memoryLimitKb: number;
}

export const codeExecutionConfig = registerAs(
  'codeExecution',
  (): CodeExecutionConfig => ({
    judge0ApiUrl:
      process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com',
    judge0ApiKey: process.env.JUDGE0_API_KEY || '',
    timeoutMs: parseInt(process.env.CODE_TIMEOUT_MS || '5000', 10),
    memoryLimitKb: parseInt(process.env.CODE_MEMORY_LIMIT_KB || '128000', 10),
  }),
);
