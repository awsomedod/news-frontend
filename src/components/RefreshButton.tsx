import './style/button.css';
import './style/refreshButton.css';

/**
 * Props interface for the RefreshButton component.
 */
interface RefreshButtonProps {
  /** Callback function called when the button is clicked */
  onClick: () => void;
  /** Whether the button is in a loading state (shows spinner and disables button) */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Refresh button component with loading state and spinner animation.
 * Used for refreshing news content and other data that requires loading states.
 */
function RefreshButton({ onClick, isLoading = false, disabled = false }: RefreshButtonProps) {
  return (
    <button
      className={`btn btn-primary btn-medium refresh-btn ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <svg
        className={`refresh-icon ${isLoading ? 'spinning' : ''}`}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 4v6h-6" />
        <path d="M1 20v-6h6" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
      {isLoading ? 'Refreshing...' : 'Refresh News'}
    </button>
  );
}

export default RefreshButton; 