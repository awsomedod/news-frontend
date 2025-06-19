import './style/summary.css';

interface SummaryProps {
  summary: string;
}

function Summary({ summary }: SummaryProps) {
  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary</h2>
      <p className="summary-text">{summary}</p>
    </div>
  );
}

export default Summary; 