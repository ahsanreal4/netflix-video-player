import { memo, useMemo, useRef } from "react";
import { VideoInfo } from "../../data/VideoPlayer";
import { VideoDefaultControls, VideoPlayerProps } from "./VideoPlayer.types";

import classes from "./VideoPlayer.module.css";
import Overlay from "./components/Overlay/Overlay";
import useVideoControlEvents from "./hooks/useVideoControlEvents";
import useLoadVideoSource from "./hooks/useLoadVideoSource";

import "./VideoPlayer.css";

const VideoPlayer = ({
  autoPlay = false,
  muted = false,
  src = "",
  resizeMode = "fill",
  fullScreenOnStart = false,
  disableControls = false,
  controls = VideoDefaultControls,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    togglePlayPause,
    playVideo,
    forwardVideo,
    rewindVideo,
    toggleVolume,
    unmute,
    mute,
    paused,
    toggleFullScreen,
    fullScreen,
  } = useVideoControlEvents({
    videoRef,
    fullScreenOnStart,
  });
  useLoadVideoSource({ autoPlay, playVideo, src, videoRef });

  const Video = useMemo(
    () => (
      <video
        ref={videoRef}
        id="video"
        controls={false}
        className={classes.video}
        poster={VideoInfo.waitingImage}
        muted={muted}
        style={{ objectFit: resizeMode }}
      />
    ),
    [muted]
  );

  return (
    <div id="video-main_container_999" className={classes.video_container}>
      <Overlay
        togglePlayPause={togglePlayPause}
        resizeMode={resizeMode}
        paused={paused}
        muted={muted}
        forwardVideo={forwardVideo}
        rewindVideo={rewindVideo}
        toggleVolume={toggleVolume}
        mute={mute}
        unmute={unmute}
        toggleFullScreen={toggleFullScreen}
        fullscreen={fullScreen}
        disableControls={disableControls}
        controls={controls}
      />

      {Video}
    </div>
  );
};

export default memo(VideoPlayer);
