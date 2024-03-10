import classes from "./VideoPlaybackControls.module.css";

import PlayPauseButton from "./components/PlayPauseButton/PlayPauseButton";
import VolumeButton from "./components/VolumeButton/VolumeButton";

interface VideoPlaybackControlsProps {
  paused: boolean;
  muted: boolean;
  togglePlayPause: () => void;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  toggleVolume: (volume?: number) => void;
  mute: () => void;
  unmute: () => void;
}

const VideoPlaybackControls = ({
  forwardVideo,
  paused,
  muted,
  rewindVideo,
  togglePlayPause,
  mute,
  toggleVolume,
  unmute,
}: VideoPlaybackControlsProps) => {
  return (
    <div className={classes.video_playback_controls_container}>
      <PlayPauseButton
        forwardVideo={forwardVideo}
        rewindVideo={rewindVideo}
        togglePlayPause={togglePlayPause}
        paused={paused}
      />
      <VolumeButton
        mute={mute}
        muted={muted}
        toggleVolume={toggleVolume}
        unmute={unmute}
      />
    </div>
  );
};

export default VideoPlaybackControls;
