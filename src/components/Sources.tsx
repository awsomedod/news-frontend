import './style/sources.css';
import Source from './Source';
import AddSource from './AddSource';
import AddSourceButton from './AddSourceButton';
import SuggestSource from './SuggestSource';
import { getSources, addSource, removeSource } from '../databaselol/Sources';
import { useState } from 'react';



function Sources() {
  const [sources, setSources] = useState(getSources());
  const [showAddSource, setShowAddSource] = useState(false);
  const [showSuggestSource, setShowSuggestSource] = useState(false);

  const addSourceEffect = (source: any) => {
    setSources([source, ...sources]);
    addSource(source);
    setShowAddSource(false);
  }

  const removeSourceEffect = (source: any) => {
    setSources(sources.filter((s) => s.name !== source.name));
    removeSource(source);
  }

  const handleCancelAdd = () => {
    setShowAddSource(false);
  }

  const handleSuggestSources = (suggestedSources: any[]) => {
    // Add all suggested sources to the list
    setSources([...suggestedSources, ...sources]);
    suggestedSources.forEach(source => addSource(source));
    setShowSuggestSource(false);
  }

  const handleCancelSuggest = () => {
    setShowSuggestSource(false);
  }

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
      {sources.map((source) => {
        return(
          <Source
            key={source.name}
            name={source.name}
            url={source.url}
            description={source.description}
            category={source.category}
            onDelete={() => removeSourceEffect(source)}
          />
        )
      })}
      
      {showAddSource && (
        <AddSource
          onAddSource={addSourceEffect}
          onCancel={handleCancelAdd}
        />
      )}

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