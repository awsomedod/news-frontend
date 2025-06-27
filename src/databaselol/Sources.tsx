/**
 * Interface representing a news source with its metadata.
 * Used for storing and managing news sources in the application.
 */
interface Source {
    /** Unique identifier for the source */
    id: number;
    /** Display name of the source */
    name: string;
    /** URL of the source's RSS feed or website */
    url: string;
    /** Optional description of the source */
    description?: string;
    /** Optional category or type of news the source covers */
    category?: string;
}

/**
 * In-memory storage for news sources.
 * Note: This is a simple in-memory implementation. In a production environment,
 * this should be replaced with a proper database or persistent storage solution
 * with user authentication to manage access control and source ownership.
 */
let sources: Source[] = [
];

/**
 * Retrieves all stored news sources.
 * @returns Array of all configured news sources
 */
export function getSources(): Source[] {
    return sources;
}

/**
 * Adds a new news source to the storage.
 * @param source - The source object to add
 */
export function addSource(source: Source) {
    sources.push(source);
}

/**
 * Removes a news source from storage by name.
 * @param source - The source object to remove (matched by name)
 */
export function removeSource(source: Source) {
    sources = sources.filter((s) => s.name !== source.name);
    console.log('Updated sources:', sources);
}
