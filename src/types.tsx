export type LLMProvider = 'google' | 'anthropic' | 'openai' | 'mock';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiKey?: string;
}