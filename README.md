# News AI Frontend

A React TypeScript application that provides an intelligent news aggregation and summarization interface using various LLM providers.

## Features

- **LLM Configuration**: Support for multiple AI providers (Google Gemini, Anthropic Claude, OpenAI GPT, and Mock for testing)
- **Source Management**: Add, remove, and get AI-suggested news sources
- **News Summarization**: Real-time news summaries using configured LLM providers
- **Streaming Updates**: Live streaming of news summaries as they're generated
- **Responsive Design**: Modern, clean UI with responsive layout

## Tech Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: CSS modules with custom styling
- **HTTP Client**: Axios for API requests
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Create React App with webpack configuration

## Project Structure

```
src/
├── components/          # React components
│   ├── style/          # CSS files for components
│   ├── AddSource.tsx   # Manual source addition form
│   ├── AddSourceButton.tsx # Reusable button component
│   ├── Config.tsx      # LLM provider configuration
│   ├── News.tsx        # Main news display component
│   ├── RefreshButton.tsx # News refresh functionality
│   ├── Source.tsx      # Individual source display
│   ├── Sources.tsx     # Source management container
│   ├── Story.tsx       # Individual news story display
│   ├── SuggestSource.tsx # AI-powered source suggestions
│   └── Summary.tsx     # News summary display
├── databaselol/        # Simple in-memory data storage
│   ├── Config.tsx      # Configuration storage
│   └── Sources.tsx     # Source data management
├── api.ts              # API service layer
├── types.tsx           # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Configuration

### LLM Provider Setup

The application supports multiple LLM providers:

- **Mock**: For testing (no API key required)
- **Google (Gemini)**: Requires Google AI API key
- **Anthropic (Claude)**: Requires Anthropic API key
- **OpenAI (GPT)**: Requires OpenAI API key

### API Configuration

The frontend expects a backend API running on `http://localhost:3001` by default. The backend should provide the following endpoints:

- `POST /api/init-llm` - Initialize LLM configuration
- `POST /api/suggest-sources` - Get AI-suggested news sources
- `POST /api/news-summary` - Fetch and summarize news

## Usage

1. **Initial Setup**: Configure your preferred LLM provider with appropriate API keys
2. **Add Sources**: Manually add news sources or use AI suggestions
3. **View News**: Click the refresh button to fetch and display news summaries
4. **Manage Sources**: Add or remove sources as needed

## Development

### Code Style

- Use TypeScript for all new code
- Follow React functional component patterns
- Use CSS modules for styling
- Implement proper error handling
- Add JSDoc comments for complex functions

### Adding New Features

1. Create new components in the `src/components/` directory
2. Add corresponding CSS files in `src/components/style/`
3. Update types in `src/types.tsx` if needed
4. Add API methods in `src/api.ts` for backend communication

## Dependencies

### Core Dependencies
- `react`: ^19.1.0
- `react-dom`: ^19.1.0
- `typescript`: ^4.9.5
- `axios`: ^1.10.0

### Development Dependencies
- `@types/react`: ^19.1.8
- `@types/react-dom`: ^19.1.6
- `react-scripts`: 5.0.1
- Various webpack polyfills for browser compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]
