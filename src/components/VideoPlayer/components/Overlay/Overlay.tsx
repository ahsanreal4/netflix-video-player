import { memo } from "react";
import classes from "./Overlay.module.css";
import BottomControlBar from "../BottomControlBar/BottomControlBar";
import { useVideoContext } from "../../context/VideoContextProvider";
import TopControlBar from "../TopControlBar/TopControlBar.Controller";
import { Images } from "../../VideoPlayer.assets";
import CrossOutlined from "../../assets/cross-outlined";

const Overlay = () => {
  const {
    videoPlayerProps,
    videoLoaded,
    showOverlay,
    paused,
    unableToPlayVideo,
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
          <div
            id="play_pause_animation_container"
            className={classes.play_pause_animation_container}
          >
            <img
              id="play_pause_animation_image"
              // @ts-expect-error
              src={paused ? Images.Pause : Images.Play}
            />
          </div>
          {videoLoaded == false || disableControls ? null : (
            <>
              {disableBackArrow ? null : <TopControlBar />}
              <BottomControlBar />
            </>
          )}
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
