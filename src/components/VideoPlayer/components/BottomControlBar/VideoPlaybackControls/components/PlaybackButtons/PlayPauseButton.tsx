import Pause from "../../../../../assets/pause";
import Play from "../../../../../assets/play";
import { useVideoContext } from "../../../../../context/VideoContextProvider";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";

const PlayPauseButton = () => {
  const { videoPlayerProps, paused } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { togglePlayPause } = useVideoControlEvents();

  return (
    <>
      {controls.disablePlayPauseButton ? null : (
        <div onClick={togglePlayPause}>
          {paused ? <Play className="icon" /> : <Pause className="icon" />}
        </div>
      )}
    </>
  );
};

export default PlayPauseButton;
