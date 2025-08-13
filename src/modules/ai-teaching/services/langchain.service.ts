import { Injectable } from '@nestjs/common';

@Injectable()
export class LangChainService {
  constructor() {}

  async processChain(input: string): Promise<string> {
    // TODO: Implement LangChain integration
    return `LangChain processed: ${input}`;
  }
}
