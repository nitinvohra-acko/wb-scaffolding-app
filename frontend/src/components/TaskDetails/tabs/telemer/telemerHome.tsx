import React from 'react';
import HealthProfile from './detail';
import useTelemer from './hooks/useTelemer';
import useTelemerStore from './store/telemer';
import { useParams } from 'next/navigation';
interface PropsType {
  handleLayout: (l: 'vertical' | 'horizontal') => void;
  layout: 'vertical' | 'horizontal';
  taskDetail: any;
}

const Home: React.FC<PropsType> = ({ layout, handleLayout, taskDetail }) => {
  const params = useParams();
  const [showHealthProfile, setShowHealthProfile] = React.useState(false);
  const { fetchTelemerAnswers, loading } = useTelemer();
  const { answers } = useTelemerStore.getState();
  React.useEffect(() => {
    fetchTelemerAnswers(params.slug ? params.slug[0] : '');
  }, []);
  console.log('answers', answers);
  return (
    <div style={{ height: '100vh', overflowY: 'auto' }} className="w-full">
      {loading && <h2>Loading...</h2>}
      {!showHealthProfile && (
        <div className="flex flex-col items-center h-screen">
          <h1 className="text-2xl text-center mb-4">
            Complete <span className="text-purple-400 ">telemer</span> for{' '}
            <br />
            <span className="text-gray-800 font-bold ">
              Rahul and Smita's
            </span>{' '}
          </h1>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
            onClick={() => {
              setShowHealthProfile(true);
              handleLayout('vertical');
            }}
          >
            Start Telemer
          </button>
        </div>
      )}
      {showHealthProfile && (
        <HealthProfile
          readonly={false}
          layout={layout}
          handleLayout={handleLayout}
          taskDetail={taskDetail}
        />
      )}
    </div>
  );
};

export default Home;
