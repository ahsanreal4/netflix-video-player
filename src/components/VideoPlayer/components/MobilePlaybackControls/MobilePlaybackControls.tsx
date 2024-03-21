import { useVideoContext } from "../../context/VideoContextProvider";
import ForwardButton from "../BottomControlBar/VideoPlaybackControls/components/PlaybackButtons/ForwardButton";
import PlayPauseButton from "../BottomControlBar/VideoPlaybackControls/components/PlaybackButtons/PlayPauseButton";
import RewindButton from "../BottomControlBar/VideoPlaybackControls/components/PlaybackButtons/RewindButton";
import classes from "./MobilePlaybackControls.module.css";

const MobilePlaybackControls = () => {
  const { videoPlayerProps, isLiveVideo } = useVideoContext();
  const { controls } = videoPlayerProps;
  const { disableForwardRewindButtons, disablePlayPauseButton } = controls;

  return (
    <div className={classes.container} data-attr="toggle">
      <div className={classes.playbacks_container} data-attr="toggle">
        {disableForwardRewindButtons || isLiveVideo ? null : <RewindButton />}
        {disablePlayPauseButton ? null : <PlayPauseButton />}
        {disableForwardRewindButtons || isLiveVideo ? null : <ForwardButton />}
      </div>
    </div>
  );
};

export default MobilePlaybackControls;
