import { ReactNode, useContext, useRef, useState } from "react";
import VideoContext from "./VideoContext";
import {
  IVideoPlayerDefaultProps,
  VideoDefaultControls,
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [paused, setPaused] = useState(true);
  const [isLiveVideo, setIsLiveVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoFirstTimeLoaded, setVideoFirstTimeLoaded] = useState(false);
  const [lockControls, setLockControls] = useState(false);
  const [videoPlayerProps, setVideoPlayerProps] =
    useState<IVideoPlayerDefaultProps>(VideoPlayerDefaultProps);
  const [showOverlay, setShowOverlay] = useState(false);
  const [unableToPlayVideo, setUnableToPlayVideo] = useState(false);

  const initializeVideoProps = (props: VideoPlayerProps) => {
    if (props.isLive) setIsLiveVideo(true);
    setVideoPlayerProps({
      ...VideoPlayerDefaultProps,
      ...props,
      controls: {
        disableBackArrow:
          props.controls?.disableBackArrow ??
          VideoDefaultControls.disableBackArrow,
        disableForwardRewindButtons:
          props.controls?.disableForwardRewindButtons ??
          VideoDefaultControls.disableForwardRewindButtons,
        disableFullScreenButton:
          props.controls?.disableFullScreenButton ??
          VideoDefaultControls.disableFullScreenButton,
        disablePlayPauseButton:
          props.controls?.disablePlayPauseButton ??
          VideoDefaultControls.disablePlayPauseButton,
        disableProgressBar:
          props.controls?.disableProgressBar ??
          VideoDefaultControls.disableProgressBar,
        disableTime:
          props.controls?.disableTime ?? VideoDefaultControls.disableTime,
        disableVolumeButton:
          props.controls?.disableVolumeButton ??
          VideoDefaultControls.disableVolumeButton,
        disableLockButton:
          props.controls?.disableLockButton ??
          VideoDefaultControls.disableLockButton,
      },
    });
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
        containerRef,
        isLiveVideo,
        setIsLiveVideo,
        videoLoading,
        setVideoLoading,
        showOverlay,
        setShowOverlay,
        unableToPlayVideo,
        setUnableToPlayVideo,
        lockControls,
        setLockControls,
        videoFirstTimeLoaded,
        setVideoFirstTimeLoaded,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
