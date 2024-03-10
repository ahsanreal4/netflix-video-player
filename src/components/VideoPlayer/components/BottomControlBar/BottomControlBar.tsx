import { Controls } from "../../VideoPlayer.types";
import classes from "./BottomControlBar.module.css";
import VideoOtherControls from "./VideoOtherControls/VideoOtherControls";
import VideoPlaybackControls from "./VideoPlaybackControls/VideoPlaybackControls";

interface BottomControlBarProps {
  paused: boolean;
  muted: boolean;
  fullscreen: boolean;
  controls: Controls;
  togglePlayPause: () => void;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  toggleVolume: (volume?: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleFullScreen: () => void;
}

const BottomControlBar = ({
  paused,
  muted,
  togglePlayPause,
  fullscreen,
  forwardVideo,
  rewindVideo,
  mute,
  toggleVolume,
  unmute,
  toggleFullScreen,
  controls,
}: BottomControlBarProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.controls_container}>
        <VideoPlaybackControls
          forwardVideo={forwardVideo}
          paused={paused}
          rewindVideo={rewindVideo}
          togglePlayPause={togglePlayPause}
          mute={mute}
          toggleVolume={toggleVolume}
          unmute={unmute}
          muted={muted}
          controls={controls}
        />
        <VideoOtherControls
          fullscreen={fullscreen}
          toggleFullScreen={toggleFullScreen}
          controls={controls}
        />
      </div>
    </div>
  );
};

export default BottomControlBar;
