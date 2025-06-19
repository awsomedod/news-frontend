import './style/news.css';
import Summary from './Summary';
import Story from './Story';
import RefreshButton from './RefreshButton';
import { useState } from 'react';


function getNews() {
  const news = [
    {
      id: 1,
      title: "Major Tech Breakthrough Announced",
      summary: "Scientists have announced a revolutionary breakthrough in quantum computing that could transform the industry.",
      image: "https://bloximages.chicago2.vip.townnews.com/dailycal.org/content/tncms/assets/v3/editorial/f/4e/f4e1e6a7-3d8b-470b-84ce-799c1e4a9439/684a5861df306.image.jpg?resize=776%2C500"
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      summary: "World leaders have reached a landmark agreement on climate change measures at the latest international summit.",
      image: "https://bloximages.chicago2.vip.townnews.com/dailycal.org/content/tncms/assets/v3/editorial/9/45/9450a159-713b-416f-a67f-52b5451b8d88/68506e9d5130e.image.jpg?resize=776%2C500"
    },
  ];
  return news;
}

function News() {
  // Sample data - you can replace this with your actual data
  const summaryText = "Today's top headlines cover breaking news from around the world, featuring major developments in technology, politics, and global events.";


  const [stories, setStories] = useState(getNews());
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshNews = () => {
    setIsLoading(true);
    setStories(getNews());
    setIsLoading(false);
  };

  return (
    <div className="news-container">
      <RefreshButton onClick={handleRefreshNews} isLoading={isLoading} />
      <Summary summary={summaryText} />
      <div className="stories-section">
        {stories.map(story => (
          <Story
            key={story.id}
            title={story.title}
            summary={story.summary}
            image={story.image}
          />
        ))}
      </div>
    </div>
  );
}

export default News;