import { memo, useEffect, useRef, useState } from "react";
import { VideoInfo } from "../../data/VideoPlayer";
import { VideoFormats, VideoPlayerProps } from "./VideoPlayer.types";

import classes from "./VideoPlayer.module.css";
import Overlay from "./components/Overlay/Overlay";
import useVideoControlEvents from "./hooks/useVideoControlEvents";
import useLoadVideoSource from "./hooks/useLoadVideoSource";

const VideoPlayer = ({
  autoPlay = false,
  muted = false,
  src = "",
  resizeMode = "fill",
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState<boolean>(true);

  const {
    togglePlayPause,
    playVideo,
    forwardVideo,
    rewindVideo,
    toggleVolume,
    unmute,
    mute,
  } = useVideoControlEvents({
    setPaused,
    videoRef,
  });
  useLoadVideoSource({ autoPlay, playVideo, src, videoRef });

  return (
    <div className={classes.video_container}>
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
      />

      <video
        ref={videoRef}
        id="video"
        controls={false}
        className={classes.video}
        poster={VideoInfo.waitingImage}
        muted={muted}
        style={{ objectFit: resizeMode }}
      />
    </div>
  );
};

export default memo(VideoPlayer);
