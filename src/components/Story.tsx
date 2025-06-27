import './style/story.css';

/**
 * Props interface for the Story component.
 */
interface StoryProps {
  /** The headline or title of the news story */
  title: string;
  /** The AI-generated summary of the news story */
  summary: string;
  /** URL of the image associated with the story */
  image: string;
}

/**
 * Component for displaying individual news stories.
 * Shows the story title, summary, and associated image in a card layout.
 */
function Story({ title, summary, image }: StoryProps) {
  return (
    <div className="story-container">
      <div className="story-image-container">
        <img src={image} alt={title} className="story-image" />
      </div>
      <div className="story-content">
        <h3 className="story-title">{title}</h3>
        <p className="story-summary">{summary}</p>
      </div>
    </div>
  );
}

export default Story; 