# API Integration Guide

This document describes the backend API requirements for the News AI Frontend application.

## Overview

The frontend application communicates with a backend API to:
- Initialize and configure LLM providers
- Get AI-suggested news sources
- Fetch and summarize news from configured sources

## Base Configuration

The frontend expects the backend API to be available at:
- **Default**: `http://localhost:3001`
- **Configurable**: Set via `REACT_APP_API_URL` environment variable

## API Endpoints

### 1. Initialize LLM Configuration

**Endpoint**: `POST /api/init-llm`

**Purpose**: Initialize and configure an LLM provider on the backend.

**Request Body**:
```json
{
  "provider": "google|anthropic|openai|mock",
  "model": "string",
  "apiKey": "string" // Optional for mock provider
}
```

**Response**:
```json
{
  "success": true,
  "message": "LLM initialized successfully",
  "provider": "google",
  "model": "gemini-2.0-flash",
  "error": null
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Failed to initialize LLM",
  "provider": "google",
  "model": "gemini-2.0-flash",
  "error": "Invalid API key"
}
```

### 2. Suggest News Sources

**Endpoint**: `POST /api/suggest-sources`

**Purpose**: Get AI-suggested news sources based on a topic.

**Request Body**:
```json
{
  "topic": "technology",
  "bias": "neutral"
}
```

**Response**:
```json
{
  "success": true,
  "sources": [
    {
      "name": "TechCrunch",
      "url": "https://techcrunch.com/feed/",
      "description": "Latest technology news and startup information",
      "category": "Technology"
    }
  ],
  "error": null
}
```

**Error Response**:
```json
{
  "success": false,
  "sources": [],
  "error": "Failed to get suggestions"
}
```

### 3. Get News Summary

**Endpoint**: `POST /api/news-summary`

**Purpose**: Fetch and summarize news from specified sources.

**Request Body**:
```json
{
  "sources": [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml"
  ]
}
```

**Response Types**:

#### Standard Response (JSON)
```json
{
  "success": true,
  "summary": {
    "id": 1,
    "title": "Breaking News Headline",
    "summary": "AI-generated summary of the news story...",
    "image": "https://example.com/image.jpg"
  },
  "error": null
}
```

#### Streaming Response (Server-Sent Events)
The endpoint also supports streaming responses using Server-Sent Events (SSE). Each event should be formatted as:

```
data: {"id": 1, "title": "Headline", "summary": "Summary text...", "image": "image_url"}
```

## Supported LLM Providers

### Google (Gemini)
- **Models**: `gemini-2.0-flash-lite`, `gemini-2.0-flash`, `gemini-2.5-flash-preview-05-20`, `gemini-1.5-flash`
- **API Key**: Required
- **Base URL**: `https://generativelanguage.googleapis.com`

### Anthropic (Claude)
- **Models**: `claude-3-5-sonnet-20241022`, `claude-3-5-haiku-20241022`, `claude-3-opus-20240229`
- **API Key**: Required
- **Base URL**: `https://api.anthropic.com`

### OpenAI (GPT)
- **Models**: `gpt-4o`, `gpt-4o-mini`, `gpt-3.5-turbo`
- **API Key**: Required
- **Base URL**: `https://api.openai.com`

### Mock Provider
- **Models**: `mock-model`
- **API Key**: Not required
- **Purpose**: For testing and development

## Error Handling

The frontend expects consistent error responses across all endpoints:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

Common error scenarios to handle:
- Invalid API keys
- Network connectivity issues
- Rate limiting
- Invalid request parameters
- LLM service unavailability

## CORS Configuration

The backend should be configured to allow CORS requests from the frontend:

```javascript
// Example CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## Security Considerations

1. **API Key Storage**: API keys should be stored securely on the backend, not in the frontend
2. **Request Validation**: Validate all incoming requests for required fields and data types
3. **Rate Limiting**: Implement appropriate rate limiting for API endpoints
4. **Error Messages**: Avoid exposing sensitive information in error messages

## Testing

The frontend includes a mock provider for testing purposes. When using the mock provider:
- No API key is required
- The backend should return mock data
- All endpoints should work without external API calls

## Development Setup

1. Start the backend server on `http://localhost:3001`
2. Set the `REACT_APP_API_URL` environment variable if using a different URL
3. Configure an LLM provider through the frontend interface
4. Test the integration by adding sources and fetching news

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend allows requests from the frontend origin
2. **Network Errors**: Check that the backend is running and accessible
3. **API Key Issues**: Verify that the API key is valid and has the necessary permissions
4. **Streaming Issues**: Ensure the backend properly implements Server-Sent Events

### Debug Information

The frontend logs detailed error information to the console for debugging:
- Network request failures
- API response parsing errors
- Configuration issues

## Future Enhancements

Potential API enhancements:
- Authentication and user management
- Source categorization and filtering
- News article archiving
- User preferences and settings
- Real-time notifications
- Multi-language support 