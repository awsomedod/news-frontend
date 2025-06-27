import './style/addSource.css';
import { useState } from 'react';
import { apiService } from '../api';
import { SuggestSourcesResponse } from '../api';

/**
 * Props interface for the SuggestSource component.
 */
interface SuggestSourceProps {
  /** Callback function called when sources are selected and confirmed */
  onSuggestSources: (sources: any[]) => void;
  /** Callback function called when the modal is cancelled */
  onCancel: () => void;
}

/**
 * Interface representing a suggested news source.
 */
interface Source {
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
 * Component for getting AI-suggested news sources based on a topic.
 * Provides a two-step process: first enter a topic, then select from suggested sources.
 */
function SuggestSource({ onSuggestSources, onCancel }: SuggestSourceProps) {
  const [topic, setTopic] = useState('');
  const [suggestedSources, setSuggestedSources] = useState<Source[]>([]);
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  /**
   * Handles form submission to get AI-suggested sources for a topic.
   * Validates the response and displays the suggestions for selection.
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      setIsLoading(true);
      setError(null);
      
      try {
        // Request AI-suggested sources from the backend
        const suggestions: SuggestSourcesResponse = await apiService.suggestSources({ 
          topic: topic, 
          bias: 'neutral' 
        });
        
        const srcs = suggestions.sources;
        
        // Validate the response format
        if (!srcs || !Array.isArray(srcs)) {
          throw new Error('Invalid response format: expected sources array');
        }
        
        // Validate each source has required properties
        srcs.forEach((source: any, index: number) => {
          if (!source.name || !source.url || !source.description || !source.category) {
            throw new Error(`Invalid source at index ${index}: missing required properties`);
          }
        });

        // Convert response to Source objects
        const sources: Source[] = srcs.map((source: { name: string; url: string; description: string; category: string; }) => ({
          name: source.name,
          url: source.url,
          description: source.description,
          category: source.category
        }));
        
        setSuggestedSources(sources);
        setShowSuggestions(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get suggestions');
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
   * Toggles the selection state of a source in the suggestions list.
   * @param sourceName - The name of the source to toggle
   */
  const handleSourceToggle = (sourceName: string) => {
    const newSelected = new Set(selectedSources);
    if (newSelected.has(sourceName)) {
      newSelected.delete(sourceName);
    } else {
      newSelected.add(sourceName);
    }
    setSelectedSources(newSelected);
  };

  /**
   * Confirms the selection of sources and calls the callback with selected sources.
   */
  const handleConfirmSelection = () => {
    const selectedSourcesList = suggestedSources.filter(source => 
      selectedSources.has(source.name)
    );
    onSuggestSources(selectedSourcesList);
  };

  /**
   * Returns to the topic input form, clearing all suggestions and selections.
   */
  const handleBackToForm = () => {
    setShowSuggestions(false);
    setSelectedSources(new Set());
    setSuggestedSources([]);
    setError(null);
  };

  // Render the source selection view
  if (showSuggestions) {
    return (
      <div className="add-source-overlay">
        <div className="add-source-modal">
          <div className="add-source-header">
            <h2>Select Sources for "{topic}"</h2>
            <button 
              className="close-button" 
              onClick={onCancel}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <div className="suggestions-container">
            <p>Select the sources you'd like to add:</p>
            <div className="sources-list">
              {suggestedSources.map((source) => (
                <div key={source.name} className="source-item">
                  <label className="source-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSources.has(source.name)}
                      onChange={() => handleSourceToggle(source.name)}
                    />
                    <div className="source-info">
                      <h4>{source.name}</h4>
                      <p className="source-category">{source.category}</p>
                      <p className="source-description">{source.description}</p>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-url">
                        {source.url}
                      </a>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="add-source-actions">
            <button type="button" onClick={handleBackToForm} className="back-button">
              Back
            </button>
            <button 
              type="button" 
              onClick={handleConfirmSelection} 
              className="confirm-button"
              disabled={selectedSources.size === 0}
            >
              Add Selected ({selectedSources.size})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the topic input form
  return (
    <div className="add-source-overlay">
      <div className="add-source-modal">
        <div className="add-source-header">
          <h2>Suggest Sources</h2>
          <button 
            className="close-button" 
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-source-form">
          <div className="form-group">
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., technology, politics, sports)"
              required
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Getting Suggestions...' : 'Get Suggestions'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SuggestSource; 