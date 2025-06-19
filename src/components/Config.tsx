import React, { useState } from 'react';
import { LLMProvider, LLMConfig } from '../types';
import { apiService } from '../api';
import './style/config.css';

interface ConfigProps {
  onConfigComplete: () => void;
}

const GoogleModels = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-2.5-flash-preview-05-20'];
const AnthropicModels = ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'];
const OpenAIModels = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'];
const MockModels = ['mock-model'];

const modelMap: Record<LLMProvider, string[]> = {
  google: GoogleModels,
  anthropic: AnthropicModels,
  openai: OpenAIModels,
  mock: MockModels
};

const Config: React.FC<ConfigProps> = ({ onConfigComplete }) => {
  const [provider, setProvider] = useState<LLMProvider>('mock');
  const [model, setModel] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleProviderChange = (newProvider: LLMProvider) => {
    setProvider(newProvider);
    setModel(modelMap[newProvider][0] || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const config: LLMConfig = {
      provider,
      model,
      apiKey: provider === 'mock' ? undefined : apiKey
    };
    
    try {
      // Make API call to initialize LLM
      const result = await apiService.initLLM(config);

      if (result.success) {
        // Store config in localStorage for persistence
        localStorage.setItem('llmConfig', JSON.stringify(config));
        onConfigComplete();
      } else {
        setError(result.error || 'Failed to configure LLM');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Config error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="config-container">
      <div className="config-card">
        <h1>LLM Configuration</h1>
        <p>Please configure your LLM provider to get started.</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="config-form">
          <div className="form-group">
            <label htmlFor="provider">LLM Provider:</label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => handleProviderChange(e.target.value as LLMProvider)}
              required
              disabled={isLoading}
            >
              <option value="mock">Mock (for testing)</option>
              <option value="google">Google (Gemini)</option>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="openai">OpenAI (GPT)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              disabled={isLoading}
            >
              {modelMap[provider].map((modelOption) => (
                <option key={modelOption} value={modelOption}>
                  {modelOption}
                </option>
              ))}
            </select>
          </div>

          {provider !== 'mock' && (
            <div className="form-group">
              <label htmlFor="apiKey">API Key:</label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                required
                disabled={isLoading}
              />
              <small>
                Your API key will be stored locally and used only for this session.
              </small>
            </div>
          )}

          <button 
            type="submit" 
            className="config-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Configuring...' : 'Configure LLM'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Config; 