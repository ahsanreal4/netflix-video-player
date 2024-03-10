export type ResizeModeType = "fill" | "cover" | "contain";

export interface Controls {
  disablePlayPauseButton?: boolean;
  disableForwardRewindButtons?: boolean;
  disableVolumeButton?: boolean;
  disableFullScreenButton?: boolean;
}

export interface VideoPlayerProps {
  src: string;
  fullScreenOnStart?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  thumbnail?: string;
  resizeMode?: ResizeModeType;
  disableControls?: boolean;
  controls?: Controls;
}

export const VideoDefaultControls: Controls = {
  disableForwardRewindButtons: false,
  disableFullScreenButton: false,
  disablePlayPauseButton: false,
  disableVolumeButton: false,
};

export enum VideoFormats {
  Mp4 = "mp4",
  FLV = "flv",
}

export enum Volume {
  Mute = 0,
  Full = 1,
  // Below or equal to it volume will be considered low
  LowPoint = 0.25,
  // More or equal to it volume will be considered high
  MidPoint = 0.75,
}
