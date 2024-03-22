import classes from "./PlaybackSpeed.module.css";

import PlaybackSpeedIcon from "../../../assets/playback-speed";
import { useRef, useState } from "react";
import PlaybackSettings from "./components/PlaybackSettings";

const PlaybackSpeed = () => {
  const [showPlaybackSettings, setShowPlaybackSettings] = useState(false);
  const isMouseOnIconRef = useRef<boolean>(false);
  const isMouseOnContainerRef = useRef<boolean>(false);

  const togglePlaybackSettings = () => {
    setShowPlaybackSettings((prev) => !prev);
  };

  const showPlaybackSetting = () => {
    setShowPlaybackSettings(true);
  };

  const hidePlaybackSettings = () => {
    setShowPlaybackSettings(false);
  };

  const onMouseEnter = () => {
    const WAIT_TIMEOUT = 300;
    isMouseOnIconRef.current = true;

    setTimeout(() => {
      // If mouse not on container or icon then we don't show it
      if (
        isMouseOnIconRef.current == false &&
        isMouseOnContainerRef.current == false
      )
        return;

      showPlaybackSetting();
    }, WAIT_TIMEOUT);
  };

  const onMouseLeave = () => {
    const WAIT_TIMEOUT = 500;
    isMouseOnIconRef.current = false;

    setTimeout(() => {
      // If Mouse is on icon or container then don't hide
      if (
        isMouseOnContainerRef.current == true ||
        isMouseOnIconRef.current == true
      )
        return;

      hidePlaybackSettings();
    }, WAIT_TIMEOUT);
  };

  return (
    <div className={classes.container}>
      {showPlaybackSettings ? (
        <PlaybackSettings
          isMouseOnContainerRef={isMouseOnContainerRef}
          isMouseOnIconRef={isMouseOnIconRef}
          setShowPlaybackSettings={setShowPlaybackSettings}
        />
      ) : null}
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <PlaybackSpeedIcon className="icon small_icon" />
      </div>
    </div>
  );
};

export default PlaybackSpeed;
