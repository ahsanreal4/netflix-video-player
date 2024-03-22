import classes from "../../../Overlay.module.css";

import { useVideoContext } from "../../../../../context/VideoContextProvider";
import Play from "../../../../../assets/play";
import Pause from "../../../../../assets/pause";

const PlayPauseAnimation = () => {
  const { paused } = useVideoContext();

  return (
    <div
      data-attr="toggle"
      id="play_pause_animation_container"
      className={classes.play_pause_animation_container}
    >
      {paused ? (
        <Play id="play_pause_animation_image" />
      ) : (
        <Pause id="play_pause_animation_image" />
      )}
    </div>
  );
};

export default PlayPauseAnimation;
