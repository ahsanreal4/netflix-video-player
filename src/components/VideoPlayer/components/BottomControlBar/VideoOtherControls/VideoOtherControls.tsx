import { memo } from "react";

import EnterFullScreen from "../../../assets/enter-full-screen";

import ExitFullScreen from "../../../assets/exit-full-screen";
import { useVideoContext } from "../../../context/VideoContextProvider";
import useVideoControlEvents from "../../../hooks/useVideoControlEvents";

import classes from "./VideoOtherControls.module.css";
import PlaybackSpeed from "../../../assets/playback-speed";

const VideoOtherControls = () => {
  const { videoPlayerProps, fullscreen } = useVideoContext();
  const { controls } = videoPlayerProps;
  const { disableFullScreenButton, disablePlaybackSpeedButton } = controls;

  const { toggleFullScreen } = useVideoControlEvents();

  return (
    <div className={classes.container}>
      {disablePlaybackSpeedButton ? null : (
        <PlaybackSpeed className="icon small_icon" />
      )}
      {disableFullScreenButton ? null : (
        <div onClick={toggleFullScreen}>
          {fullscreen ? (
            <ExitFullScreen className="icon small_icon" />
          ) : (
            <EnterFullScreen className="icon small_icon" />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(VideoOtherControls);
