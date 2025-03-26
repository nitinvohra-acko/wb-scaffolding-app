import React from 'react';
import HealthProfile from './detail';

const Home: React.FC = () => {
  const [showHealthProfile, setShowHealthProfile] = React.useState(false);
  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      {!showHealthProfile && (
        <div className="flex flex-col items-center h-screen">
          <h1 className="text-2xl text-center mb-4">
            Complete <span className="text-purple-400 ">telemer</span> for{' '}
            <br />
            <span className="text-gray-800 font-bold ">
              [John Doe 4]'s
            </span>{' '}
          </h1>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
            onClick={() => {
              setShowHealthProfile(true);
            }}
          >
            Start Telemer
          </button>
        </div>
      )}
      {showHealthProfile && <HealthProfile readonly={false} />}
    </div>
  );
};

export default Home;
