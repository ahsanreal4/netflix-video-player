import { useVideoContext } from "../../../../../context/VideoContextProvider";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";
import { Images } from "../../../../../VideoPlayer.assets";

const PlayPauseButton = () => {
  const { videoPlayerProps, paused } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { togglePlayPause } = useVideoControlEvents();

  return (
    <>
      {controls.disablePlayPauseButton ? null : (
        <img
          className={"icon mobile_icon"}
          // @ts-expect-error
          src={paused ? Images.Play : Images.Pause}
          width={32}
          height={32}
          onClick={togglePlayPause}
        />
      )}
    </>
  );
};

export default PlayPauseButton;
