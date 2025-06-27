/**
 * Supported LLM providers for the news AI application.
 * Each provider offers different models and capabilities.
 */
export type LLMProvider = 'google' | 'anthropic' | 'openai' | 'mock';

/**
 * Configuration interface for LLM providers.
 * Contains the necessary settings to initialize and use an LLM service.
 */
export interface LLMConfig {
  /** The LLM provider to use (Google, Anthropic, OpenAI, or Mock) */
  provider: LLMProvider;
  /** The specific model to use from the selected provider */
  model: string;
  /** API key for the provider (optional for mock provider) */
  apiKey?: string;
}