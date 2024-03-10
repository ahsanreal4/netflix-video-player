import ForwardTime from "../../../../../assets/forward-time";
import RewindTime from "../../../../../assets/rewind-time";
import { Images } from "../../../../../VideoPlayer.assets";
import { Controls } from "../../../../../VideoPlayer.types";

import classes from "./PlayPauseButton.module.css";

interface PlayPauseButtonProps {
  togglePlayPause: () => void;
  forwardVideo: (time?: number) => void;
  rewindVideo: (time?: number) => void;
  paused: boolean;
  controls: Controls;
}

const PlayPauseButton = ({
  forwardVideo,
  rewindVideo,
  togglePlayPause,
  paused,
  controls,
}: PlayPauseButtonProps) => {
  return (
    <>
      {controls.disablePlayPauseButton ? null : (
        <img
          className={"icon"}
          // @ts-expect-error
          src={paused ? Images.Play : Images.Pause}
          width={32}
          height={32}
          onClick={togglePlayPause}
        />
      )}
      {controls.disableForwardRewindButtons ? null : (
        <>
          <div
            onClick={() => {
              rewindVideo();
            }}
          >
            <RewindTime className={"icon"} />
          </div>
          <div
            onClick={() => {
              forwardVideo();
            }}
          >
            <ForwardTime className={"icon"} />
          </div>
        </>
      )}
    </>
  );
};

export default PlayPauseButton;
