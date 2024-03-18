import { memo } from "react";
import classes from "./VideoPlaybackControls.module.css";

import PlaybackButtons from "./components/PlaybackButtons/PlaybackButtons";
import VolumeButton from "./components/VolumeButton/VolumeButton";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { isMobile } from "react-device-detect";
import useVideoControlEvents from "../../../hooks/useVideoControlEvents";

const VideoPlaybackControls = () => {
  const { videoPlayerProps } = useVideoContext();
  const { toggleLockUnlockControls } = useVideoControlEvents();

  return (
    <div className={classes.video_playback_controls_container}>
      {isMobile ? null : <PlaybackButtons />}
      {videoPlayerProps.controls?.disableVolumeButton ? null : <VolumeButton />}
      {isMobile ? (
        <p style={{ color: "white" }} onClick={toggleLockUnlockControls}>
          Lock
        </p>
      ) : null}
    </div>
  );
};

export default memo(VideoPlaybackControls);
