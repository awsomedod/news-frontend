/**
 * Configuration object for the news application.
 * Contains settings for news sources, topics, and keywords.
 * Note: This is a simple in-memory implementation. In a production environment,
 * this should be replaced with a proper database or persistent storage solution.
 */
let config = {
    news: {
        /** Array of news source URLs */
        sources: [],
        /** Array of news topics to track */
        topics: [],
        /** Array of keywords to filter news by */
        keywords: [],
    }
}

/**
 * Retrieves the current application configuration.
 * @returns The current configuration object
 */
export function getConfig() {
    return config;
}