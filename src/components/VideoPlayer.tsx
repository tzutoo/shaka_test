import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

interface VideoPlayerProps {
  url: string;
  title: string; // Add title prop
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!mounted) return;

      // Install polyfills and configure Shaka
      shaka.polyfill.installAll();

      if (shaka.Player.isBrowserSupported() && videoRef.current) {
        try {
          const player = new shaka.Player(videoRef.current);

          // Configure player to support HLS
          player.configure({
            streaming: {
              useNativeHlsOnSafari: true
            }
          });

          playerRef.current = player;
          await player.load(url);
        } catch (error) {
          console.error('Error loading media:', error);
        }
      } else {
        console.error('Browser not supported!');
      }
    };

    init();

    return () => {
      mounted = false;
      playerRef.current?.destroy();
    };
  }, [url]); // Add url to dependency array

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{title}</h2>
      <video
        ref={videoRef}
        style={{ width: '100%', height: 'auto' }}
        controls
        autoPlay
        muted
      />
    </div>
  );
};

export default VideoPlayer;
