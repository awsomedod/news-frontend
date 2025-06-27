import './style/addSource.css';
import { useState } from 'react';

/**
 * Props interface for the AddSource component.
 */
interface AddSourceProps {
  /** Callback function called when a new source is successfully added */
  onAddSource: (source: {
    name: string;
    url: string;
    description?: string;
    category?: string;
  }) => void;
  /** Callback function called when the modal is cancelled */
  onCancel: () => void;
}

/**
 * Form data interface for the add source form.
 */
interface FormData {
  name: string;
  url: string;
  description: string;
  category: string;
}

/**
 * Error state interface for form validation.
 */
interface FormErrors {
  name: string;
  url: string;
}

/**
 * Component for manually adding new news sources.
 * Provides a form with validation for adding sources with name, URL, description, and category.
 */
function AddSource({ onAddSource, onCancel }: AddSourceProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    url: '',
    description: '',
    category: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    url: ''
  });

  /**
   * Validates the form data and sets error messages.
   * @returns True if the form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: '',
      url: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.url;
  };

  /**
   * Validates if a string is a valid URL.
   * @param url - The URL string to validate
   * @returns True if the URL is valid, false otherwise
   */
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Handles form submission and adds the new source if validation passes.
   * @param e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newSource = {
        name: formData.name.trim(),
        url: formData.url.trim(),
        description: formData.description.trim() || undefined,
        category: formData.category.trim() || undefined
      };
      
      onAddSource(newSource);
      
      // Reset form
      setFormData({
        name: '',
        url: '',
        description: '',
        category: ''
      });
    }
  };

  /**
   * Handles input changes and clears validation errors when user starts typing.
   * @param e - The input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="add-source-overlay">
      <div className="add-source-modal">
        <div className="add-source-header">
          <h2>Add New Source</h2>
          <button 
            className="close-button" 
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-source-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter source name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="url">URL *</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={errors.url ? 'error' : ''}
            />
            {errors.url && <span className="error-message">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter source description (optional)"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter category (optional)"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Source
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSource; 