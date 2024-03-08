import "./App.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { VideoInfo } from "./data/VideoPlayer";

function App() {
  return (
    <div className="App" style={{ width: "100%", height: "100vh" }}>
      <VideoPlayer
        thumbnail={VideoInfo.waitingImage}
        src={VideoInfo.link}
        resizeMode="contain"
      />
    </div>
  );
}

export default App;
