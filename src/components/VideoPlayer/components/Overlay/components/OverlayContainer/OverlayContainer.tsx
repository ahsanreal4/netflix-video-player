import { isMobile } from "react-device-detect";
import classes from "../../Overlay.module.css";
import { useVideoContext } from "../../../../context/VideoContextProvider";
import MobileLockUnlock from "../../../BottomControlBar/MobileLockUnlock/MobileLockUnlock";
import PlayPauseAnimation from "./components/PlayPauseAnimation";
import OverlayControls from "./components/OverlayControls";

const OverlayContainer = () => {
  const { lockControls, videoPlayerProps, videoFirstTimeLoaded } =
    useVideoContext();
  const { disableControls, controls } = videoPlayerProps;
  const { disableBackArrow } = controls;

  return (
    <div className={classes.overlay_container}>
      <div data-attr="toggle" className={classes.overlay_top_container} />
      <div data-attr="toggle" className={classes.overlay_bottom_container} />
      {isMobile ? null : <PlayPauseAnimation />}
      {lockControls ||
      videoFirstTimeLoaded == false ||
      disableControls ? null : (
        <OverlayControls disableBackArrow={disableBackArrow ?? true} />
      )}
      {lockControls ? <MobileLockUnlock /> : null}
    </div>
  );
};

export default OverlayContainer;
