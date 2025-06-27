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


## CORS Configuration

The backend should be configured to allow CORS requests from the frontend:

```javascript
// Example CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## Development Setup

1. Start the backend server on `http://localhost:3001`
2. Set the `REACT_APP_API_URL` environment variable if using a different URL
3. Configure an LLM provider through the frontend interface
4. Test the integration by adding sources and fetching news
