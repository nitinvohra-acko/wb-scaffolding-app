import React, { FC, useMemo } from 'react';
const TeleMerInfo: FC<{ label: string[] }> = ({ label }) => {
  const renderList = useMemo(() => {
    return (
      <>
        <div>
          {label?.map((value, i) => {
            return (
              <div className="text-sm text-gray-900 dark:text-white" key={i}>
                {value}
              </div>
            );
          })}
        </div>
      </>
    );
  }, [label]);
  return <div className="m-1">{renderList}</div>;
};

export default TeleMerInfo;
