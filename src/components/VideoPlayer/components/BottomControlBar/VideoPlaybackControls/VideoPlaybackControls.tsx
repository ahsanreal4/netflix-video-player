import { memo } from "react";
import classes from "./VideoPlaybackControls.module.css";

import PlaybackButtons from "./components/PlaybackButtons/PlaybackButtons";
import VolumeButton from "./components/VolumeButton/VolumeButton";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { isMobile } from "react-device-detect";
import useVideoControlEvents from "../../../hooks/useVideoControlEvents";
import Lock from "../../../assets/lock";

const VideoPlaybackControls = () => {
  const { videoPlayerProps } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { toggleLockUnlockControls } = useVideoControlEvents();

  return (
    <div className={classes.video_playback_controls_container}>
      {isMobile ? null : <PlaybackButtons />}
      {videoPlayerProps.controls?.disableVolumeButton ? null : <VolumeButton />}
      {isMobile && controls.disableLockButton == false ? (
        <div onClick={toggleLockUnlockControls}>
          <Lock className={classes.lock_icon} />
        </div>
      ) : null}
    </div>
  );
};

export default memo(VideoPlaybackControls);
