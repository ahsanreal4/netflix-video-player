import { memo } from "react";

import EnterFullScreen from "../../../assets/enter-full-screen";

import ExitFullScreen from "../../../assets/exit-full-screen";
import { useVideoContext } from "../../../context/VideoContextProvider";
import useVideoControlEvents from "../../../hooks/useVideoControlEvents";

import classes from "./VideoOtherControls.module.css";

const VideoOtherControls = () => {
  const { videoPlayerProps, fullscreen } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { toggleFullScreen } = useVideoControlEvents();

  return (
    <div className={classes.container}>
      {controls.disableFullScreenButton ? null : (
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
