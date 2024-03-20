import { memo, useEffect, useMemo, useRef } from "react";
import { VideoInfo } from "../../data/VideoPlayer";
import { VideoPlayerProps } from "./VideoPlayer.types";

import classes from "./VideoPlayer.module.css";
import Overlay from "./components/Overlay/Overlay";
import useVideoControlEvents from "./hooks/useVideoControlEvents";
import useLoadVideoSource from "./hooks/useLoadVideoSource";

import "./VideoPlayer.css";
import { useVideoContext } from "./context/VideoContextProvider";

const VideoPlayer = (props: VideoPlayerProps) => {
  const firstRunRef = useRef<boolean>(false);

  const {
    initializeVideoProps,
    videoRef,
    videoPlayerProps,
    containerRef,
    setVideoLoading,
  } = useVideoContext();
  const { muted, resizeMode } = videoPlayerProps;

  const { playVideo, onOverlayClick, initializeEventListeners } =
    useVideoControlEvents();
  useLoadVideoSource(playVideo);

  useEffect(() => {
    initializeVideoProps(props);
  }, []);

  useEffect(() => {
    if (firstRunRef.current == false) {
      firstRunRef.current = true;
      return;
    }
    initializeEventListeners();
  }, [videoPlayerProps]);

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
        preload="auto"
        onWaiting={() => {
          setVideoLoading(true);
        }}
        onPlaying={() => {
          setVideoLoading(false);
        }}
      />
    ),
    [muted, resizeMode]
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
