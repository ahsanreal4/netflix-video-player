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

  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoPlayerProps: React.Dispatch<
    React.SetStateAction<IVideoPlayerDefaultProps>
  >;
  initializeVideoProps: (props: VideoPlayerProps) => void;
}

const INITIAL_STATE: VideoContextState = {
  fullscreen: false,
  paused: false,
  videoPlayerProps: VideoPlayerDefaultProps,
  videoRef: { current: null },

  setFullscreen: () => {},
  setPaused: () => {},
  setVideoPlayerProps: () => {},
  initializeVideoProps: () => {},
};

const VideoContext = createContext(INITIAL_STATE);

export default VideoContext;
