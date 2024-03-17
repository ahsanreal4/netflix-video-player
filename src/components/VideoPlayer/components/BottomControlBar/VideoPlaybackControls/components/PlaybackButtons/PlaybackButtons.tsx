import { useVideoContext } from "../../../../../context/VideoContextProvider";
import ForwardButton from "./ForwardButton";
import PlayPauseButton from "./PlayPauseButton";
import RewindButton from "./RewindButton";

const PlaybackButtons = () => {
  const { videoPlayerProps, isLiveVideo } = useVideoContext();
  const { controls } = videoPlayerProps;

  return (
    <>
      <PlayPauseButton />
      {isLiveVideo || controls.disableForwardRewindButtons ? null : (
        <>
          <RewindButton />
          <ForwardButton />
        </>
      )}
    </>
  );
};

export default PlaybackButtons;
