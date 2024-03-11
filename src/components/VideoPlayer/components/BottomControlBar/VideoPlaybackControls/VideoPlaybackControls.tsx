import { memo } from "react";
import classes from "./VideoPlaybackControls.module.css";

import PlayPauseButton from "./components/PlayPauseButton/PlayPauseButton";
import VolumeButton from "./components/VolumeButton/VolumeButton";
import { useVideoContext } from "../../../context/VideoContextProvider";

const VideoPlaybackControls = () => {
  const { videoPlayerProps } = useVideoContext();

  return (
    <div className={classes.video_playback_controls_container}>
      <PlayPauseButton />
      {videoPlayerProps.controls?.disableVolumeButton ? null : <VolumeButton />}
    </div>
  );
};

export default memo(VideoPlaybackControls);
