import { isMobile } from "react-device-detect";
import BottomControlBar from "../../../../BottomControlBar/BottomControlBar";
import MobilePlaybackControls from "../../../../MobilePlaybackControls/MobilePlaybackControls";
import TopControlBar from "../../../../TopControlBar/TopControlBar.Controller";

interface OverlayControlsProps {
  disableBackArrow: boolean;
}

const OverlayControls = ({ disableBackArrow }: OverlayControlsProps) => {
  return (
    <>
      {disableBackArrow ? null : <TopControlBar />}
      <BottomControlBar />
      {isMobile ? <MobilePlaybackControls /> : null}
    </>
  );
};

export default OverlayControls;
