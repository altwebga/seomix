'use client';

import { useState } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Spinner } from '@nextui-org/spinner';

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const onReady = (event: YouTubeEvent) => {
    setIsLoading(false);
  };

  const opts = {
    width: '560',
    height: '315',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div style={{ position: 'relative', width: '560px', height: '315px' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          zIndex: 1,
        }}>
          <Spinner />
        </div>
      )}
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default YouTubePlayer;
