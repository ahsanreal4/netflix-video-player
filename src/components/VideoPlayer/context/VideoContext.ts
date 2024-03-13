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
  isLiveVideo: boolean;
  videoLoaded: boolean;
  showOverlay: boolean;

  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoPlayerProps: React.Dispatch<
    React.SetStateAction<IVideoPlayerDefaultProps>
  >;
  setIsLiveVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  initializeVideoProps: (props: VideoPlayerProps) => void;
}

const INITIAL_STATE: VideoContextState = {
  fullscreen: false,
  paused: false,
  isLiveVideo: false,
  videoPlayerProps: VideoPlayerDefaultProps,
  videoRef: { current: null },
  videoLoaded: false,
  showOverlay: false,

  setFullscreen: () => {},
  setPaused: () => {},
  setVideoPlayerProps: () => {},
  setIsLiveVideo: () => {},
  setVideoLoaded: () => {},
  setShowOverlay: () => {},
  initializeVideoProps: () => {},
};

const VideoContext = createContext(INITIAL_STATE);

export default VideoContext;
