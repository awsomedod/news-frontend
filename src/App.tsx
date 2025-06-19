import React, { useState, useEffect } from 'react';
import './App.css';
import News from './components/News';
import Sources from './components/Sources';
import Config from './components/Config';
import { LLMConfig } from './types';
// import { LLMProvider } from './ai/LLMContext';

function App() {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    // Check if we have a stored config
    const storedConfig = localStorage.getItem('llmConfig');
    if (storedConfig) {
      setIsConfigured(true);
    }
  }, []);

  const handleConfigComplete = () => {
    setIsConfigured(true);
  };

  const handleResetConfig = () => {
    localStorage.removeItem('llmConfig');
    setIsConfigured(false);
  };

  // Show configuration if not yet configured
  if (!isConfigured) {
    return <Config onConfigComplete={handleConfigComplete} />;
  }

  // Show main app content after configuration
  return (
    <div className="App">
      <div className="header">
        <h1>News AI</h1>
        <button 
          onClick={handleResetConfig}
          className="reset-config-btn"
          title="Reset LLM Configuration"
        >
          ⚙️ Reset Config
        </button>
      </div>
      <div className="main-content">
        <Sources />
        <News />
      </div>
    </div>
  );
}

export default App;
