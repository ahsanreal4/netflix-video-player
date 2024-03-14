export type ResizeModeType = "fill" | "cover" | "contain";

export interface Controls {
  disablePlayPauseButton?: boolean;
  disableForwardRewindButtons?: boolean;
  disableVolumeButton?: boolean;
  disableFullScreenButton?: boolean;
  disableBackArrow?: boolean;
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
}

export const VideoDefaultControls: Controls = {
  disableForwardRewindButtons: false,
  disableFullScreenButton: false,
  disablePlayPauseButton: false,
  disableVolumeButton: false,
  disableBackArrow: true,
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
