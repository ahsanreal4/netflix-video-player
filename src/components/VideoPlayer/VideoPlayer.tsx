import VideoPlayer from "./VideoPlayerContextWrapper";
import { VideoPlayerProps } from "./VideoPlayer.types";
import { VideoContextProvider } from "./context/VideoContextProvider";

const VideoPlayerContextWrapper = (props: VideoPlayerProps) => {
  return (
    <VideoContextProvider>
      <VideoPlayer {...props} />
    </VideoContextProvider>
  );
};

export default VideoPlayerContextWrapper;
