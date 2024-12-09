import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

const VideoPlayer: React.FC = () => {
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
          playerRef.current = player;
          await player.load('https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      playerRef.current?.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <video
        ref={videoRef}
        style={{ width: '50%', height: '50%' }}
        controls
        autoPlay
        muted
      />
    </div>
  );
};

export default VideoPlayer;
