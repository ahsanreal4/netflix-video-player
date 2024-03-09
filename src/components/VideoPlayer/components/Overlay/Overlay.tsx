import { memo } from "react";
import { ResizeModeType } from "../../VideoPlayer.types";
import classes from "./Overlay.module.css";
import BottomControlBar from "../BottomControlBar/BottomControlBar";

interface OverlayProps {
  togglePlayPause: () => void;
  resizeMode: ResizeModeType;
  paused: boolean;
  muted: boolean;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  toggleVolume: (volume?: number) => void;
  mute: () => void;
  unmute: () => void;
}

const Overlay = ({
  togglePlayPause,
  resizeMode,
  paused,
  muted,
  forwardVideo,
  rewindVideo,
  mute,
  toggleVolume,
  unmute,
}: OverlayProps) => {
  return (
    <div className={classes.overlay_container}>
      <BottomControlBar
        paused={paused}
        togglePlayPause={togglePlayPause}
        forwardVideo={forwardVideo}
        rewindVideo={rewindVideo}
        mute={mute}
        unmute={unmute}
        toggleVolume={toggleVolume}
        muted={muted}
      />
    </div>
  );
};

export default memo(Overlay);
