import VideoPlayer from './components/VideoPlayer';

const App = () => {
  const dashUrl = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
  const hlsUrl = 'https://previewvod-hamivideo.cdn.hinet.net/vod/hamivideo2/hamivideo-2024-2024100375_p_001/_/hd_6840-hls-ae-all-ma-6sv2/index.m3u8';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '20px',
      height: '100vh'
    }}>
      <div style={{ width: '45%' }}>
        <VideoPlayer url={dashUrl} title="DASH Stream" />
      </div>
      <div style={{ width: '45%' }}>
        <VideoPlayer url={hlsUrl} title="HLS Stream" />
      </div>
    </div>
  );
};

export default App;
