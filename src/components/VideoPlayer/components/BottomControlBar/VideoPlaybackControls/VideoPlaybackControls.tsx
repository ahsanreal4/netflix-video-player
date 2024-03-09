import { useState } from "react";
import ForwardTime from "../../../assets/forward-time";
import RewindTime from "../../../assets/rewind-time";
import { Images } from "../../../VideoPlayer.assets";

import classes from "./VideoPlaybackControls.module.css";

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
  const [volume, setVolume] = useState(muted ? 0 : 100);
  console.log(volume);

  return (
    <div className={classes.video_playback_controls_container}>
      <img
        className={classes.image}
        // @ts-expect-error
        src={paused ? Images.Play : Images.Pause}
        width={32}
        height={32}
        onClick={togglePlayPause}
      />
      <div
        onClick={() => {
          rewindVideo();
        }}
      >
        <RewindTime className={classes.image} />
      </div>
      <div
        onClick={() => {
          forwardVideo();
        }}
      >
        <ForwardTime className={classes.image} />
      </div>
    </div>
  );
};

export default VideoPlaybackControls;
