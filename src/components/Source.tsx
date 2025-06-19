import './style/source.css';

interface SourceProps {
  name: string;
  url: string;
  description?: string;
  category?: string;
  onDelete: () => void;
}

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