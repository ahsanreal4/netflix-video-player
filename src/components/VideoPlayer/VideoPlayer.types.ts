import { MutableRefObject } from "react";

export type ResizeModeType = "fill" | "cover" | "contain";

export interface Controls {
  disablePlayPauseButton?: boolean;
  disableForwardRewindButtons?: boolean;
  disableVolumeButton?: boolean;
  disableFullScreenButton?: boolean;
  disableBackArrow?: boolean;
  disableProgressBar?: boolean;
  disableTime?: boolean;
  disableLockButton?: boolean;
  disablePlaybackSpeedButton?: boolean;
}

export interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  thumbnail?: string;
  resizeMode?: ResizeModeType;
  disableControls?: boolean;
  controls?: Controls;
  loopVideo?: boolean;
  isLive?: boolean;
  navigation?: any;
  displayControlsOnFirstRender?: boolean;
  disableKeyboardArrowEventListeners?: boolean;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
}

export interface IVideoPlayerDefaultProps {
  src: string;
  autoPlay: boolean;
  muted: boolean;
  thumbnail: string;
  resizeMode: ResizeModeType;
  disableControls: boolean;
  controls: Controls;
  loopVideo: boolean;
  isLive: boolean;
  navigation: any;
  displayControlsOnFirstRender: boolean;
  disableKeyboardArrowEventListeners: boolean;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
}

export const VideoDefaultControls: Controls = {
  disableForwardRewindButtons: false,
  disableFullScreenButton: false,
  disablePlayPauseButton: false,
  disableVolumeButton: false,
  disableBackArrow: true,
  disableTime: false,
  disableProgressBar: false,
  disableLockButton: false,
  disablePlaybackSpeedButton: false,
};

export const VideoPlayerDefaultProps: IVideoPlayerDefaultProps = {
  autoPlay: false,
  muted: false,
  src: "",
  resizeMode: "fill",
  disableControls: false,
  controls: VideoDefaultControls,
  thumbnail: "",
  loopVideo: false,
  isLive: false,
  navigation: null,
  displayControlsOnFirstRender: false,
  disableKeyboardArrowEventListeners: false,
};

export enum VideoFormats {
  MP4 = "mp4",
  FLV = "flv",
  MOV = "mov",
  MPEG4 = "mpeg-4",
}

export enum Volume {
  Mute = 0,
  Full = 1,
  // Below or equal to it volume will be considered low
  LowPoint = 0.25,
  // More or equal to it volume will be considered high
  MidPoint = 0.75,
}

export enum KeyCodes {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}

export enum VideoEventListeners {
  TimeUpdate = "timeupdate",
  DurationChange = "durationchange",
  FullScreenChange = "fullscreenchange",
  KeyDown = "keydown",
  MouseMove = "mousemove",
  Click = "click",
  Ended = "ended",
  Loaded = "loadeddata",
}
