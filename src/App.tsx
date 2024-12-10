import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const dashUrl = 'http://dash.akamaized.net/dash264/TestCases/1c/qualcomm/1/MultiRate.mpd';
  const hlsUrl = 'http://externaltests.dev.kaltura.com/player/sandBox/alex-sandBox/master.m3u8';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '20px',
      height: '100vh'
    }}>
      <div style={{ width: '45%' }}>
        <VideoPlayer
          url={dashUrl}
          title="DASH Stream"
          isPlaying={currentPlaying === dashUrl}
          onPlay={() => setCurrentPlaying(dashUrl)}
        />
      </div>
      <div style={{ width: '45%' }}>
        <VideoPlayer
          url={hlsUrl}
          title="HLS Stream"
          isPlaying={currentPlaying === hlsUrl}
          onPlay={() => setCurrentPlaying(hlsUrl)}
        />
      </div>
    </div>
  );
};

export default App;
