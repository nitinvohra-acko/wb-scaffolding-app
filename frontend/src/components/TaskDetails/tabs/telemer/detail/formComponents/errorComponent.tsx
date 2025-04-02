import React from 'react';

interface ErrorComponentProps {
  errorMessage?: string; // The error message to display
  isVisible: boolean; // Whether the error message should be visible
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorMessage,
  isVisible,
}) => {
  if (!isVisible || !errorMessage) {
    return null;
  }

  return (
    <div className="px-2 py-1 rounded-xl bg-red-100 mt-2">
      <div className="text-red-500 text-sm">{errorMessage}</div>
    </div>
  );
};

export default ErrorComponent;
