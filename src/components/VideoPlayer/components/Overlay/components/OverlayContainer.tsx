import { isMobile } from "react-device-detect";
import classes from "../Overlay.module.css";
import { useVideoContext } from "../../../context/VideoContextProvider";
import MobilePlaybackControls from "../../MobilePlaybackControls/MobilePlaybackControls";
import BottomControlBar from "../../BottomControlBar/BottomControlBar";
import TopControlBar from "../../TopControlBar/TopControlBar.Controller";
import MobileLockUnlock from "../../BottomControlBar/MobileLockUnlock/MobileLockUnlock";

import { Images } from "../../../VideoPlayer.assets";

const OverlayContainer = () => {
  const { videoLoaded, paused, lockControls, videoPlayerProps } =
    useVideoContext();
  const { disableControls, controls } = videoPlayerProps;
  const { disableBackArrow } = controls;

  return (
    <div className={classes.overlay_container}>
      <div data-attr="toggle" className={classes.overlay_top_container} />
      <div data-attr="toggle" className={classes.overlay_bottom_container} />
      {isMobile ? null : (
        <div
          data-attr="toggle"
          id="play_pause_animation_container"
          className={classes.play_pause_animation_container}
        >
          <img
            data-attr="toggle"
            id="play_pause_animation_image"
            // @ts-expect-error
            src={paused ? Images.Pause : Images.Play}
          />
        </div>
      )}
      {lockControls || videoLoaded == false || disableControls ? null : (
        <>
          {disableBackArrow ? null : <TopControlBar />}
          <BottomControlBar />
          {isMobile ? <MobilePlaybackControls /> : null}
        </>
      )}
      {lockControls ? <MobileLockUnlock /> : null}
    </div>
  );
};

export default OverlayContainer;
