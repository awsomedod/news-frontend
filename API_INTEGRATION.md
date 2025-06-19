# API Integration Guide

## Overview

The frontend now uses a simplified approach to integrate with the backend API. Instead of using React Context for configuration management, the app makes direct API calls and stores configuration in localStorage.

## Key Changes

### 1. Simplified State Management
- Removed `LLMConfig` state from `App.tsx`
- Configuration is now handled directly in the `Config` component
- Uses a simple boolean flag `isConfigured` to show/hide the config screen

### 2. Direct API Integration
- Created `src/api.ts` service for centralized API calls
- Config component calls `/api/init-llm` directly
- All API calls use the `apiService` utility

### 3. Configuration Persistence
- Configuration is stored in `localStorage` as `llmConfig`
- App checks localStorage on startup to determine if already configured
- Reset button allows users to clear configuration and start over

## API Endpoints Used

### Initialize LLM
```typescript
POST /api/init-llm
Body: { provider, model, apiKey? }
Response: { success, message, provider, model }
```

### Suggest Sources
```typescript
POST /api/suggest-sources
Body: { topic, bias }
Response: { success, sources: string[] }
```

### Get News Summary
```typescript
POST /api/news-summary
Body: { sources: string[] }
Response: string (plain text summary)
```

## Benefits of This Approach

1. **Simpler Architecture**: No need for React Context or complex state management
2. **Direct API Calls**: Clear separation between frontend and backend
3. **Better Error Handling**: API responses include success/error flags
4. **Persistence**: Configuration survives page refreshes
5. **Easy Reset**: Users can easily reset configuration if needed

## Usage

1. User opens the app
2. If no configuration exists, the Config screen is shown
3. User selects provider, model, and enters API key
4. Config component calls `/api/init-llm` to initialize the backend
5. On success, configuration is stored in localStorage
6. App shows the main interface with Sources and News components
7. User can reset configuration using the reset button in the header

## Environment Variables

Set `REACT_APP_API_URL` in your `.env` file to point to your backend:
```
REACT_APP_API_URL=http://localhost:3000
```

If not set, it defaults to `http://localhost:3000`. 