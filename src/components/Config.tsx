import React, { useState } from 'react';
import { LLMProvider, LLMConfig } from '../types';
import { apiService } from '../api';
import './style/config.css';

/**
 * Props interface for the Config component.
 */
interface ConfigProps {
  /** Callback function called when configuration is successfully completed */
  onConfigComplete: () => void;
}

/**
 * Available models for each LLM provider.
 * These models are supported by the backend API.
 */
const GoogleModels = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-2.5-flash-preview-05-20', 'gemini-1.5-flash'];
const AnthropicModels = ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'];
const OpenAIModels = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'];
const MockModels = ['mock-model'];

/**
 * Mapping of LLM providers to their available models.
 */
const modelMap: Record<LLMProvider, string[]> = {
  google: GoogleModels,
  anthropic: AnthropicModels,
  openai: OpenAIModels,
  mock: MockModels
};

/**
 * Configuration component for setting up LLM providers.
 * Allows users to select a provider, model, and provide API keys.
 * Handles the initialization of the LLM service on the backend.
 */
const Config: React.FC<ConfigProps> = ({ onConfigComplete }) => {
  const [provider, setProvider] = useState<LLMProvider>('mock');
  const [model, setModel] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Handles provider selection and automatically sets the first available model.
   * @param newProvider - The newly selected LLM provider
   */
  const handleProviderChange = (newProvider: LLMProvider) => {
    setProvider(newProvider);
    setModel(modelMap[newProvider][0] || '');
  };

  /**
   * Handles form submission and LLM configuration.
   * Validates the configuration and sends it to the backend for initialization.
   * @param e - The form submission event
   */
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
      // Initialize LLM on the backend
      const result = await apiService.initLLM(config);

      if (result.success) {
        // Store configuration in localStorage for persistence
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
              <option value="anthropic">Anthropic (Not implemented)</option>
              <option value="openai">OpenAI (Not implemented)</option>
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