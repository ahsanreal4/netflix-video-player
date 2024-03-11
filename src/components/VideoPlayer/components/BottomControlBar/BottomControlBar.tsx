import classes from "./BottomControlBar.module.css";
import VideoOtherControls from "./VideoOtherControls/VideoOtherControls";
import VideoPlaybackControls from "./VideoPlaybackControls/VideoPlaybackControls";

const BottomControlBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.controls_container}>
        <VideoPlaybackControls />
        <VideoOtherControls />
      </div>
    </div>
  );
};

export default BottomControlBar;
