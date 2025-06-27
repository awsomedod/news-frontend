import { LLMConfig } from './types';

/**
 * Base URL for the backend API.
 * Can be configured via REACT_APP_API_URL environment variable.
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Request interface for suggesting news sources based on a topic.
 */
export interface SuggestSourcesRequest {
  /** The topic to find sources for (e.g., "technology", "politics") */
  topic: string;
  /** The desired bias of the sources (e.g., "neutral", "left", "right") */
  bias: string;
}

/**
 * Represents a news source with its metadata.
 */
export interface Source {
  /** Display name of the source */
  name: string;
  /** URL of the source's RSS feed or website */
  url: string;
  /** Brief description of the source */
  description: string;
  /** Category or type of news the source covers */
  category: string;
}

/**
 * Response interface for source suggestion requests.
 */
export interface SuggestSourcesResponse {
  /** Whether the request was successful */
  success: boolean;
  /** Array of suggested news sources */
  sources: Source[];
  /** Error message if the request failed */
  error?: string;
}

/**
 * Request interface for fetching news summaries.
 */
export interface NewsSummaryRequest {
  /** Array of source URLs to fetch news from */
  sources: string[];
}

/**
 * Represents a single news story with its summary.
 */
export interface NewsSummaryResponseItem {
  /** Unique identifier for the story */
  id: number;
  /** Headline of the news story */
  title: string;
  /** AI-generated summary of the story */
  summary: string;
  /** URL to an image associated with the story */
  image: string;
}

/**
 * Response interface for news summary requests.
 */
export interface NewsSummaryResponse {
  /** Whether the request was successful */
  success: boolean;
  /** The summarized news story */
  summary?: NewsSummaryResponseItem;
  /** Error message if the request failed */
  error?: string;
}

/**
 * Interface for streaming news summary updates.
 * Used for real-time updates as summaries are generated.
 */
export interface NewsSummaryStreamItem {
  /** Unique identifier for the story */
  id?: number;
  /** Headline of the news story */
  title?: string;
  /** AI-generated summary of the story */
  summary?: string;
  /** URL to an image associated with the story */
  image?: string;
}

/**
 * Response interface for LLM initialization requests.
 */
export interface InitLLMResponse {
  /** Whether the initialization was successful */
  success: boolean;
  /** Status message from the initialization */
  message: string;
  /** The configured provider name */
  provider: string;
  /** The configured model name */
  model: string;
  /** Error message if initialization failed */
  error?: string;
}

/**
 * Service class for handling all API communications with the backend.
 * Provides methods for LLM configuration, source suggestions, and news summaries.
 */
class ApiService {
  private baseUrl: string;

  /**
   * Creates a new API service instance.
   * @param baseUrl - The base URL for the API (defaults to environment variable or localhost)
   */
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Initializes the LLM configuration on the backend.
   * @param config - The LLM configuration to initialize
   * @returns Promise resolving to the initialization response
   */
  async initLLM(config: LLMConfig): Promise<InitLLMResponse> {
    const response = await fetch(`${this.baseUrl}/api/init-llm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    return response.json();
  }

  /**
   * Requests AI-suggested news sources based on a topic.
   * @param request - The source suggestion request containing topic and bias
   * @returns Promise resolving to suggested sources
   */
  async suggestSources(request: SuggestSourcesRequest): Promise<SuggestSourcesResponse> {
    const response = await fetch(`${this.baseUrl}/api/suggest-sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  }

  /**
   * Fetches news summaries from specified sources.
   * @param request - The news summary request containing source URLs
   * @returns Promise resolving to the news summary text
   * @throws Error if the request fails
   */
  async getNewsSummary(request: NewsSummaryRequest): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/news-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get news summary');
    }

    return response.text();
  }

  /**
   * Fetches news summaries with streaming updates.
   * Provides real-time updates as summaries are generated.
   * @param request - The news summary request containing source URLs
   * @param onSummaryReceived - Callback function called for each summary update
   * @returns Promise that resolves when streaming is complete
   * @throws Error if the request fails or response body is unavailable
   */
  async getNewsSummaryStream(
    request: NewsSummaryRequest, 
    onSummaryReceived: (summary: NewsSummaryStreamItem) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/news-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get news summary');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body available');
    }

    const decoder = new TextDecoder();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.trim() && line.startsWith('data: ')) {
            try {
              const data = line.slice(6); // Remove 'data: ' prefix
              const summary = JSON.parse(data);
              onSummaryReceived(summary);
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

// Export a singleton instance of the API service
export const apiService = new ApiService();
export default apiService; 