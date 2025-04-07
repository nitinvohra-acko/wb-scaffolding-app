import React from 'react';
import Spinner from './spinner';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <Spinner />
    </div>
  );
};

export default PageLoader;
