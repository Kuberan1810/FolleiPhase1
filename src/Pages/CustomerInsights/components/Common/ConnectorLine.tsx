import React from 'react';

const ConnectorLine: React.FC = () => {
  return (
    <div className="flex items-center justify-center relative px-0 w-full">
      <div
        className="hidden md:block h-[1.5px] w-full max-w-[252px] rounded-[10px] relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #004370 0%, #80A1B7 33%, #BFD0DB 66%, #005B96 100%)'
        }}
      />
      <div
        className="md:hidden w-[1.5px] h-[32px]"
        style={{
          background: 'linear-gradient(180deg, #004370 0%, #80A1B7 33%, #BFD0DB 66%, #005B96 100%)'
        }}
      />
    </div>
  );
};

export default ConnectorLine;
