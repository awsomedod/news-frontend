import './style/news.css';
import Summary from './Summary';
import Story from './Story';
import RefreshButton from './RefreshButton';
import { useEffect, useState } from 'react';
import { apiService, NewsSummaryResponse, NewsSummaryRequest, NewsSummaryResponseItem } from '../api';
import { getSources } from '../databaselol/Sources';
import { Source } from '../api';

async function getNews(): Promise<NewsSummaryResponseItem[]> {
  const sources: Source[] = getSources().map(source => ({
    name: source.name,
    url: source.url,
    description: source.description || '',
    category: source.category || ''
  }));
  const request: NewsSummaryRequest = {
    sources: sources.map(source => source.url)
  };
  const response = await apiService.getNewsSummary(request);
  const responseJson: {success: boolean, summary: NewsSummaryResponseItem[]} = JSON.parse(response);
  const news = responseJson.summary;
  if (!news) {
    return [];
  }
  console.log(news);


  return news;
}

function News() {
  const summaryText = "Today's top headlines cover breaking news from around the world, featuring major developments in technology, politics, and global events.";

  const [stories, setStories] = useState<NewsSummaryResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshNews = async () => {
    setIsLoading(true);

    if (getSources().length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      const newsData = await getNews();
      setStories(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // // Load initial data
  // useEffect(() => {
  //   handleRefreshNews();
  // }, [handleRefreshNews]);

  return (
    <div className="news-container">
      <RefreshButton onClick={handleRefreshNews} isLoading={isLoading} />
      <Summary summary={summaryText} />
      <div className="stories-section">
        {stories.map((story: NewsSummaryResponseItem) => (
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