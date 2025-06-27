import './style/summary.css';

/**
 * Props interface for the Summary component.
 */
interface SummaryProps {
  /** The summary text to display */
  summary: string;
}

/**
 * Component for displaying a summary section.
 * Shows a title and summary text in a styled container.
 */
function Summary({ summary }: SummaryProps) {
  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary</h2>
      <p className="summary-text">{summary}</p>
    </div>
  );
}

export default Summary; 