import classes from "./BottomControlBar.module.css";
import VideoPlaybackControls from "./VideoPlaybackControls/VideoPlaybackControls";

interface BottomControlBarProps {
  paused: boolean;
  muted: boolean;
  togglePlayPause: () => void;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  toggleVolume: (volume?: number) => void;
  mute: () => void;
  unmute: () => void;
}

const BottomControlBar = ({
  paused,
  muted,
  togglePlayPause,
  forwardVideo,
  rewindVideo,
  mute,
  toggleVolume,
  unmute,
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
        />
      </div>
    </div>
  );
};

export default BottomControlBar;
