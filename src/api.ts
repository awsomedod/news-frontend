import { LLMConfig } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface SuggestSourcesRequest {
  topic: string;
  bias: string;
}

export interface Source {
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface SuggestSourcesResponse {
  success: boolean;
  sources: Source[];
  error?: string;
}

export interface NewsSummaryRequest {
  sources: string[];
}

export interface NewsSummaryResponseItem {
  id: number;
  title: string;
  summary: string;
  image: string;
}


export interface NewsSummaryResponse {
  success: boolean;
  summary?: NewsSummaryResponseItem;
  error?: string;
}

export interface InitLLMResponse {
  success: boolean;
  message: string;
  provider: string;
  model: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

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
}

export const apiService = new ApiService();
export default apiService; 