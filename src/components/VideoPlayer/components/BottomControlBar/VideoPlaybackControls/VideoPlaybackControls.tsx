import { memo } from "react";
import classes from "./VideoPlaybackControls.module.css";

import PlayPauseButton from "./components/PlayPauseButton/PlayPauseButton";
import VolumeButton from "./components/VolumeButton/VolumeButton";
import { Controls } from "../../../VideoPlayer.types";

interface VideoPlaybackControlsProps {
  paused: boolean;
  muted: boolean;
  controls: Controls;
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
  controls,
}: VideoPlaybackControlsProps) => {
  return (
    <div className={classes.video_playback_controls_container}>
      <PlayPauseButton
        forwardVideo={forwardVideo}
        rewindVideo={rewindVideo}
        togglePlayPause={togglePlayPause}
        paused={paused}
        controls={controls}
      />
      {controls.disableVolumeButton ? null : (
        <VolumeButton
          mute={mute}
          muted={muted}
          toggleVolume={toggleVolume}
          unmute={unmute}
        />
      )}
    </div>
  );
};

export default memo(VideoPlaybackControls);
