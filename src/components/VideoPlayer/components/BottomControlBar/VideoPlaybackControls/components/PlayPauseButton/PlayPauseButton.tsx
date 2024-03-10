import ForwardTime from "../../../../../assets/forward-time";
import RewindTime from "../../../../../assets/rewind-time";
import { Images } from "../../../../../VideoPlayer.assets";

import classes from "./PlayPauseButton.module.css";

interface PlayPauseButtonProps {
  togglePlayPause: () => void;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  paused: boolean;
}

const PlayPauseButton = ({
  forwardVideo,
  rewindVideo,
  togglePlayPause,
  paused,
}: PlayPauseButtonProps) => {
  return (
    <>
      <img
        className={classes.image}
        // @ts-expect-error
        src={paused ? Images.Play : Images.Pause}
        width={32}
        height={32}
        onClick={togglePlayPause}
      />
      <div
        onClick={() => {
          rewindVideo();
        }}
      >
        <RewindTime className={classes.image} />
      </div>
      <div
        onClick={() => {
          forwardVideo();
        }}
      >
        <ForwardTime className={classes.image} />
      </div>
    </>
  );
};

export default PlayPauseButton;
