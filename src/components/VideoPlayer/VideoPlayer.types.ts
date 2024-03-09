export type ResizeModeType = "fill" | "cover" | "contain";

export interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  thumbnail?: string;
  resizeMode?: ResizeModeType;
}

export enum VideoFormats {
  Mp4 = "mp4",
  FLV = "flv",
}
