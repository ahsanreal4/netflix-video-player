import { memo } from "react";
import classes from "./Overlay.module.css";
import BottomControlBar from "../BottomControlBar/BottomControlBar";
import { useVideoContext } from "../../context/VideoContextProvider";
import TopControlBar from "../TopControlBar/TopControlBar.Controller";
import { Images } from "../../VideoPlayer.assets";
import CrossOutlined from "../../assets/cross-outlined";
import MobilePlaybackControls from "../MobilePlaybackControls/MobilePlaybackControls";
import { isMobile } from "react-device-detect";
import MobileLockUnlock from "../BottomControlBar/MobileLockUnlock/MobileLockUnlock";

const Overlay = () => {
  const {
    videoPlayerProps,
    videoLoaded,
    showOverlay,
    paused,
    unableToPlayVideo,
    lockControls,
  } = useVideoContext();
  const { disableControls, controls } = videoPlayerProps;
  const { disableBackArrow } = controls;

  return (
    <>
      {showOverlay ? (
        <div className={classes.overlay_container}>
          <div data-attr="toggle" className={classes.overlay_top_container} />
          <div
            data-attr="toggle"
            className={classes.overlay_bottom_container}
          />
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
      ) : null}
      {videoLoaded ? null : (
        <div className={classes.loading_spinner_container}>
          <div className={classes.loading_spinner}></div>
        </div>
      )}
      {unableToPlayVideo ? (
        <div className={classes.unable_to_load_container}>
          <CrossOutlined />
          <p>Video unavailable</p>
        </div>
      ) : null}
    </>
  );
};

export default memo(Overlay);
