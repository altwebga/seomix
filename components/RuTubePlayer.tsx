'use client';

import React, { useState } from 'react';
import { Spinner } from '@nextui-org/spinner';

interface RuTubePlayerProps {
  videoId: string;
}

const RuTubePlayer: React.FC<RuTubePlayerProps> = ({ videoId }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative pt-[56.25%] w-full h-0">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black z-10">
          <Spinner />
        </div>
      )}
      <iframe
        src={`https://rutube.ru/play/embed/${videoId}`}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={handleLoad}
      />
    </div>
  );
};

export default RuTubePlayer;
