import './style/sources.css';
import Source from './Source';
import AddSource from './AddSource';
import AddSourceButton from './AddSourceButton';
import SuggestSource from './SuggestSource';
import { getSources, addSource, removeSource } from '../databaselol/Sources';
import { useState } from 'react';

/**
 * Source management component that handles the display and management of news sources.
 * Provides functionality to add, remove, and get AI-suggested news sources.
 */
function Sources() {
  const [sources, setSources] = useState(getSources());
  const [showAddSource, setShowAddSource] = useState(false);
  const [showSuggestSource, setShowSuggestSource] = useState(false);

  /**
   * Adds a new source to the list and updates the local state.
   * @param source - The source object to add
   */
  const addSourceEffect = (source: any) => {
    setSources([source, ...sources]);
    addSource(source);
    setShowAddSource(false);
  };

  /**
   * Removes a source from the list and updates the local state.
   * @param source - The source object to remove
   */
  const removeSourceEffect = (source: any) => {
    setSources(sources.filter((s) => s.name !== source.name));
    removeSource(source);
  };

  /**
   * Handles cancellation of the add source modal.
   */
  const handleCancelAdd = () => {
    setShowAddSource(false);
  };

  /**
   * Handles the selection of suggested sources from the AI recommendation.
   * Adds all selected sources to the list.
   * @param suggestedSources - Array of suggested source objects
   */
  const handleSuggestSources = (suggestedSources: any[]) => {
    // Add all suggested sources to the list
    setSources([...suggestedSources, ...sources]);
    suggestedSources.forEach(source => addSource(source));
    setShowSuggestSource(false);
  };

  /**
   * Handles cancellation of the suggest sources modal.
   */
  const handleCancelSuggest = () => {
    setShowSuggestSource(false);
  };

  return (
    <div className="sources-container">
      <div className="sources-header">
        <h1>Sources</h1>
        <div className="sources-buttons">
          <AddSourceButton onClick={() => setShowAddSource(true)} variant="primary" size="medium">
            Add Source
          </AddSourceButton>
          <AddSourceButton onClick={() => setShowSuggestSource(true)} variant="secondary" size="medium">
            Suggest Sources
          </AddSourceButton>
        </div>
      </div>
      
      {/* Display all configured sources */}
      {sources.map((source) => {
        return(
          <Source
            key={source.id}
            name={source.name}
            url={source.url}
            description={source.description}
            category={source.category}
            onDelete={() => removeSourceEffect(source)}
          />
        );
      })}
      
      {/* Add Source Modal */}
      {showAddSource && (
        <AddSource
          onAddSource={addSourceEffect}
          onCancel={handleCancelAdd}
        />
      )}

      {/* Suggest Sources Modal */}
      {showSuggestSource && (
        <SuggestSource
          onSuggestSources={handleSuggestSources}
          onCancel={handleCancelSuggest}
        />
      )}
    </div>
  );
}

export default Sources;