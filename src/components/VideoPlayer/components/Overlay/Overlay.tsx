import { memo } from "react";
import classes from "./Overlay.module.css";
import BottomControlBar from "../BottomControlBar/BottomControlBar";
import { useVideoContext } from "../../context/VideoContextProvider";

const Overlay = () => {
  const { videoPlayerProps, videoLoaded } = useVideoContext();

  return (
    <div className={classes.overlay_container}>
      {videoLoaded == false || videoPlayerProps.disableControls ? null : (
        <BottomControlBar />
      )}
    </div>
  );
};

export default memo(Overlay);
