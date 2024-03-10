import { memo } from "react";
import { Controls, ResizeModeType } from "../../VideoPlayer.types";
import classes from "./Overlay.module.css";
import BottomControlBar from "../BottomControlBar/BottomControlBar";

interface OverlayProps {
  togglePlayPause: () => void;
  resizeMode: ResizeModeType;
  paused: boolean;
  muted: boolean;
  fullscreen: boolean;
  disableControls: boolean;
  controls: Controls;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  toggleVolume: (volume?: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleFullScreen: () => void;
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
  toggleFullScreen,
  fullscreen,
  disableControls,
  controls,
}: OverlayProps) => {
  return (
    <div className={classes.overlay_container}>
      {disableControls ? null : (
        <BottomControlBar
          paused={paused}
          togglePlayPause={togglePlayPause}
          forwardVideo={forwardVideo}
          rewindVideo={rewindVideo}
          mute={mute}
          unmute={unmute}
          toggleVolume={toggleVolume}
          muted={muted}
          toggleFullScreen={toggleFullScreen}
          fullscreen={fullscreen}
          controls={controls}
        />
      )}
    </div>
  );
};

export default memo(Overlay);
