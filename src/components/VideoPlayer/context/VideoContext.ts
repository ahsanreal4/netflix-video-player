import { RefObject, createContext } from "react";
import {
  IVideoPlayerDefaultProps,
  VideoPlayerDefaultProps,
  VideoPlayerProps,
} from "../VideoPlayer.types";

interface VideoContextState {
  paused: boolean;
  fullscreen: boolean;
  videoPlayerProps: IVideoPlayerDefaultProps;
  videoRef: RefObject<HTMLVideoElement>;
  containerRef: RefObject<HTMLDivElement>;
  isLiveVideo: boolean;
  videoLoading: boolean;
  videoFirstTimeLoaded: boolean;
  showOverlay: boolean;
  unableToPlayVideo: boolean;
  lockControls: boolean;
  showPlaybackSettings: boolean;

  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoPlayerProps: React.Dispatch<
    React.SetStateAction<IVideoPlayerDefaultProps>
  >;
  setIsLiveVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setUnableToPlayVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setLockControls: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoFirstTimeLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaybackSettings: React.Dispatch<React.SetStateAction<boolean>>;
  initializeVideoProps: (props: VideoPlayerProps) => void;
}

const INITIAL_STATE: VideoContextState = {
  fullscreen: false,
  paused: false,
  isLiveVideo: false,
  videoPlayerProps: VideoPlayerDefaultProps,
  videoRef: { current: null },
  containerRef: { current: null },
  videoLoading: false,
  videoFirstTimeLoaded: false,
  showOverlay: false,
  unableToPlayVideo: false,
  lockControls: false,
  showPlaybackSettings: false,

  setFullscreen: () => {},
  setPaused: () => {},
  setVideoPlayerProps: () => {},
  setIsLiveVideo: () => {},
  setVideoLoading: () => {},
  setShowOverlay: () => {},
  initializeVideoProps: () => {},
  setUnableToPlayVideo: () => {},
  setLockControls: () => {},
  setVideoFirstTimeLoaded: () => {},
  setShowPlaybackSettings: () => {},
};

const VideoContext = createContext(INITIAL_STATE);

export default VideoContext;
