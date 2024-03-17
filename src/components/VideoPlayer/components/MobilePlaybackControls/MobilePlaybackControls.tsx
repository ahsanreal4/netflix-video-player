import ForwardButton from "../BottomControlBar/VideoPlaybackControls/components/PlaybackButtons/ForwardButton";
import PlayPauseButton from "../BottomControlBar/VideoPlaybackControls/components/PlaybackButtons/PlayPauseButton";
import RewindButton from "../BottomControlBar/VideoPlaybackControls/components/PlaybackButtons/RewindButton";
import classes from "./MobilePlaybackControls.module.css";

const MobilePlaybackControls = () => {
  return (
    <div className={classes.container}>
      <div className={classes.playbacks_container}>
        <RewindButton />
        <PlayPauseButton />
        <ForwardButton />
      </div>
    </div>
  );
};

export default MobilePlaybackControls;
