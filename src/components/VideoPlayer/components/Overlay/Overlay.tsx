import { memo } from "react";
import classes from "./Overlay.module.css";
import BottomControlBar from "../BottomControlBar/BottomControlBar";
import { useVideoContext } from "../../context/VideoContextProvider";

const Overlay = () => {
  const { videoPlayerProps, videoLoaded, showOverlay } = useVideoContext();

  return (
    <>
      {showOverlay ? (
        <div className={classes.overlay_container}>
          {videoLoaded == false || videoPlayerProps.disableControls ? null : (
            <BottomControlBar />
          )}
        </div>
      ) : null}
      {videoLoaded ? null : (
        <div className={classes.loading_spinner_container}>
          <div className={classes.loading_spinner}></div>
        </div>
      )}
    </>
  );
};

export default memo(Overlay);
