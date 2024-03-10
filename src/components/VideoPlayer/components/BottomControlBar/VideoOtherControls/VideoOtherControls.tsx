import { memo } from "react";

import EnterFullScreen from "../../../assets/enter-full-screen";

import classes from "./VideoOtherControls.module.css";
import ExitFullScreen from "../../../assets/exit-full-screen";
import { Controls } from "../../../VideoPlayer.types";

interface VideoOtherControlsProps {
  fullscreen: boolean;
  controls: Controls;
  toggleFullScreen: () => void;
}

const VideoOtherControls = ({
  fullscreen,
  toggleFullScreen,
  controls,
}: VideoOtherControlsProps) => {
  return (
    <div>
      {controls.disableFullScreenButton ? null : (
        <div onClick={toggleFullScreen}>
          {fullscreen ? (
            <ExitFullScreen className="icon" />
          ) : (
            <EnterFullScreen className="icon" />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(VideoOtherControls);
