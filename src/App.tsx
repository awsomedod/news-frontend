import React, { useState, useEffect } from 'react';
import './App.css';
import News from './components/News';
import Sources from './components/Sources';
import Config from './components/Config';
import { LLMConfig } from './types';
// import { LLMProvider } from './ai/LLMContext';

/**
 * Main application component that manages the overall application state and layout.
 * Handles LLM configuration persistence and conditional rendering of components.
 */
function App() {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  /**
   * Checks for existing LLM configuration on component mount.
   * If configuration exists in localStorage, the app is considered configured.
   */
  useEffect(() => {
    const storedConfig = localStorage.getItem('llmConfig');
    if (storedConfig) {
      setIsConfigured(true);
    }
  }, []);

  /**
   * Handles the completion of LLM configuration.
   * Called when the user successfully configures an LLM provider.
   */
  const handleConfigComplete = () => {
    setIsConfigured(true);
  };

  /**
   * Resets the LLM configuration and returns to the configuration screen.
   * Removes the stored configuration from localStorage.
   */
  const handleResetConfig = () => {
    localStorage.removeItem('llmConfig');
    setIsConfigured(false);
  };

  // Show configuration screen if not yet configured
  if (!isConfigured) {
    return <Config onConfigComplete={handleConfigComplete} />;
  }

  // Show main application content after configuration
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
