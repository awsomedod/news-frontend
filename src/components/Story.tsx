import './style/story.css';

interface StoryProps {
  title: string;
  summary: string;
  image: string;
}

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