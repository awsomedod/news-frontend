# News AI Frontend

A React TypeScript application that provides an intelligent news aggregation and summarization interface using various LLM providers.

## Features

- **LLM Configuration**: Support for Google Gemini and more to come later
- **Source Management**: Add, remove, and get AI-suggested news sources
- **News Summarization**: Real-time news summaries using configured LLM providers
- **Streaming Updates**: Live streaming of news summaries as they're generated
- **Responsive Design**: Modern, clean UI with responsive layout


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

- **Google (Gemini)**: Requires Google AI API key

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

