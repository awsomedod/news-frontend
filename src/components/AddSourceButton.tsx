import './style/button.css';

/**
 * Props interface for the AddSourceButton component.
 */
interface ButtonProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** Optional callback function called when the button is clicked */
  onClick?: () => void;
  /** The visual variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** The size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes to apply to the button */
  className?: string;
}

/**
 * Reusable button component with multiple variants and sizes.
 * Used throughout the application for consistent button styling and behavior.
 */
function AddSourceButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  className = ''
}: ButtonProps) {
  const buttonClasses = `btn btn-${variant} btn-${size} ${className}`.trim();
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default AddSourceButton; 