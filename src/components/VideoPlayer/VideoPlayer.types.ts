export interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  thumbnail?: string;
  resizeMode?: "fill" | "cover" | "contain";
}

export enum VideoFormats {
  Mp4 = "mp4",
  FLV = "flv",
}
