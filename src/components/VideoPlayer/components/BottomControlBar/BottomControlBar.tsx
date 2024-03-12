import classes from "./BottomControlBar.module.css";
import VideoOtherControls from "./VideoOtherControls/VideoOtherControls";
import VideoPlaybackControls from "./VideoPlaybackControls/VideoPlaybackControls";
import VideoProgressSlider from "./VideoProgressSlider/VideoProgressSlider";

const BottomControlBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.controls_container}>
        <VideoProgressSlider />

        <div className={classes.playback_controls_container}>
          <VideoPlaybackControls />
          <VideoOtherControls />
        </div>
      </div>
    </div>
  );
};

export default BottomControlBar;
