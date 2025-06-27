import './style/news.css';
import Summary from './Summary';
import Story from './Story';
import RefreshButton from './RefreshButton';
import { useState } from 'react';
import { apiService, NewsSummaryRequest, NewsSummaryResponseItem, NewsSummaryStreamItem } from '../api';
import { getSources } from '../databaselol/Sources';
import { Source } from '../api';

/**
 * Main news display component that manages news stories and summaries.
 * Handles fetching news from configured sources and displaying them with AI-generated summaries.
 */
function News() {
  const summaryText = "Today's top headlines cover breaking news from around the world, featuring major developments in technology, politics, and global events.";

  const [stories, setStories] = useState<NewsSummaryResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Refreshes the news feed by fetching new summaries from all configured sources.
   * Uses streaming API to receive real-time updates as summaries are generated.
   */
  const handleRefreshNews = async () => {
    setIsLoading(true);
    setStories([]); // Clear existing stories

    // Check if there are any sources configured
    if (getSources().length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      // Convert stored sources to the format expected by the API
      const sources: Source[] = getSources().map(source => ({
        name: source.name,
        url: source.url,
        description: source.description || '',
        category: source.category || ''
      }));
      
      const request: NewsSummaryRequest = {
        sources: sources.map(source => source.url)
      };

      // Use the streaming API for real-time updates
      await apiService.getNewsSummaryStream(request, (summary: NewsSummaryStreamItem) => {
        // Add each summary as it arrives from the stream
        if (summary.id && summary.title && summary.summary) {
          setStories(prevStories => {
            // Check if story already exists to avoid duplicates
            const exists = prevStories.some(story => story.id === summary.id);
            if (!exists) {
              const newStory: NewsSummaryResponseItem = {
                id: summary.id!,
                title: summary.title!,
                summary: summary.summary!,
                image: summary.image || ''
              };
              return [...prevStories, newStory];
            }
            return prevStories;
          });
        }
      });
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };



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