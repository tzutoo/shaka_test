import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

interface VideoPlayerProps {
  url: string;
  title: string;
  isPlaying: boolean;
  onPlay: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, isPlaying, onPlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!mounted) return;

      shaka.polyfill.installAll();

      if (shaka.Player.isBrowserSupported() && videoRef.current) {
        try {
          const player = new shaka.Player(videoRef.current);
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
  }, [url]);

  // Handle play/pause based on isPlaying prop
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle play event
  const handlePlay = () => {
    onPlay();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{title}</h2>
      <video
        ref={videoRef}
        style={{ width: '100%', height: 'auto' }}
        controls
        muted
        onPlay={handlePlay}
      />
    </div>
  );
};

export default VideoPlayer;
