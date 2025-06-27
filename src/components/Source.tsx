import './style/source.css';

/**
 * Props interface for the Source component.
 */
interface SourceProps {
  /** Display name of the news source */
  name: string;
  /** URL of the news source */
  url: string;
  /** Optional description of the source */
  description?: string;
  /** Optional category of the source */
  category?: string;
  /** Callback function called when the source is deleted */
  onDelete: () => void;
}

/**
 * Component for displaying individual news sources.
 * Shows source information including name, description, category, and provides
 * a link to visit the source and an option to remove it.
 */
function Source({ 
  name, 
  description, 
  url, 
  category, 
  onDelete,
}: SourceProps) {

  return (
    <div 
      className={`source-item`}
    >
      <div className="source-header">
        <h3 className="source-name">{name}</h3>
        <div className="source-actions">
          {category && <span className="source-category">{category}</span>}
          <button 
            className="remove-source-btn"
            onClick={onDelete}
            aria-label={`Remove ${name} source`}
          >
            ×
          </button>
        </div>
      </div>
      
      {description && (
        <p className="source-description">{description}</p>
      )}
      
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="source-url"
        >
          Visit Source
        </a>
      )}
    </div>
  );
}

export default Source; 