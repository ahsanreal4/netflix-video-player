import ForwardTime from "../../../../../assets/forward-time";
import RewindTime from "../../../../../assets/rewind-time";
import { useVideoContext } from "../../../../../context/VideoContextProvider";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";
import { Images } from "../../../../../VideoPlayer.assets";

const PlayPauseButton = () => {
  const { videoPlayerProps, paused, isLiveVideo } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { togglePlayPause, forwardVideo, rewindVideo } =
    useVideoControlEvents();

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
      {isLiveVideo || controls.disableForwardRewindButtons ? null : (
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
