import classes from "../../../Overlay.module.css";

import { Images } from "../../../../../VideoPlayer.assets";
import { useVideoContext } from "../../../../../context/VideoContextProvider";

const PlayPauseAnimation = () => {
  const { paused } = useVideoContext();

  return (
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
  );
};

export default PlayPauseAnimation;
