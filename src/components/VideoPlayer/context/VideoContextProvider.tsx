import { ReactNode, useContext, useRef, useState } from "react";
import VideoContext from "./VideoContext";
import {
  IVideoPlayerDefaultProps,
  VideoPlayerDefaultProps,
  VideoPlayerProps,
} from "../VideoPlayer.types";

interface VideoContextProviderProps {
  children: ReactNode;
}

export const VideoContextProvider = ({
  children,
}: VideoContextProviderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [paused, setPaused] = useState(true);
  const [isLiveVideo, setIsLiveVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlayerProps, setVideoPlayerProps] =
    useState<IVideoPlayerDefaultProps>(VideoPlayerDefaultProps);
  const [showOverlay, setShowOverlay] = useState(false);

  const initializeVideoProps = (props: VideoPlayerProps) => {
    if (props.isLive) setIsLiveVideo(true);
    setVideoPlayerProps({ ...VideoPlayerDefaultProps, ...props });
  };

  return (
    <VideoContext.Provider
      value={{
        fullscreen,
        setFullscreen,
        paused,
        setPaused,
        videoPlayerProps,
        setVideoPlayerProps,
        initializeVideoProps,
        videoRef,
        isLiveVideo,
        setIsLiveVideo,
        videoLoaded,
        setVideoLoaded,
        showOverlay,
        setShowOverlay,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);