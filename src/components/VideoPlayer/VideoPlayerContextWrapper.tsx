import { memo, useEffect, useMemo } from "react";
import { VideoPlayerProps } from "./VideoPlayer.types";

import classes from "./VideoPlayer.module.css";
import Overlay from "./components/Overlay/Overlay";
import useVideoControlEvents from "./hooks/useVideoControlEvents";
import useLoadVideoSource from "./hooks/useLoadVideoSource";

import "./VideoPlayer.css";
import { useVideoContext } from "./context/VideoContextProvider";
import useVideoEventListeners from "./hooks/useVideoEventListeners/useVideoEventListeners";

const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    initializeVideoProps,
    videoRef,
    videoPlayerProps,
    containerRef,
    setVideoLoading,
    videoFirstTimeLoaded,
  } = useVideoContext();
  const { muted, resizeMode, thumbnail } = videoPlayerProps;

  const { playVideo, togglePlayPause, rewindVideo, forwardVideo } =
    useVideoControlEvents();
  const { onOverlayClick } = useVideoEventListeners(
    togglePlayPause,
    rewindVideo,
    forwardVideo
  );
  useLoadVideoSource(playVideo);

  useEffect(() => {
    initializeVideoProps(props);
  }, []);

  useEffect(() => {
    if (!videoPlayerProps.videoRef) return;
    videoPlayerProps.videoRef.current = videoRef.current;
  }, [videoRef.current, videoPlayerProps.videoRef]);

  const Video = useMemo(
    () => (
      <video
        ref={videoRef}
        id="video"
        controls={false}
        className={classes.video}
        poster={thumbnail}
        muted={muted}
        style={{ objectFit: resizeMode }}
        preload="auto"
        onWaiting={() => {
          setVideoLoading(true);
        }}
        onCanPlayThrough={() => {
          if (videoFirstTimeLoaded == false) return;

          setVideoLoading(false);
        }}
      />
    ),
    [muted, resizeMode, videoFirstTimeLoaded, thumbnail]
  );

  return (
    <div
      className={classes.video_container}
      ref={containerRef}
      onClick={onOverlayClick}
    >
      <Overlay />

      {Video}
    </div>
  );
};

export default memo(VideoPlayer);
