import { useEffect } from "react";
import { Volume } from "../VideoPlayer.types";
import { useVideoContext } from "../context/VideoContextProvider";

const useVideoControlEvents = () => {
  const { paused, fullscreen, setPaused, setFullscreen, videoRef } =
    useVideoContext();

  const playVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.play();
    setPaused(false);
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setPaused(true);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current?.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const forwardVideo = (time: number = 10) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime += time;
  };

  const rewindVideo = (time: number = 10) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime -= time;
  };

  const toggleVolume = (volume: number = Volume.Full) => {
    if (!videoRef.current) return;

    videoRef.current.volume = volume;
  };

  const mute = () => {
    toggleVolume(Volume.Mute);
  };

  const unmute = () => toggleVolume();

  const addFullScreenEventListener = () => {
    document
      .getElementById("video-main_container_999")
      ?.addEventListener("fullscreenchange", (event) => {
        // If full screen
        if (document.fullscreenElement) {
        }
        // If exiting fullscreen
        else {
          setFullscreen(false);
        }
      });
  };

  const removeFullScreenEventListener = () => {
    document
      .getElementById("video-main_container_999")
      ?.removeEventListener("fullscreenchange", () => {});
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      // @ts-ignore
      document.webkitExitFullscreen();
    }
    // @ts-ignore
    else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen();
    }

    setFullscreen(false);
  };

  const enterFullScreen = () => {
    if (!videoRef.current) return;

    document.getElementById("video-main_container_999")?.requestFullscreen();

    setFullscreen(true);
  };

  const toggleFullScreen = () => {
    if (fullscreen) {
      exitFullscreen();
    } else {
      enterFullScreen();
    }
  };

  useEffect(() => {
    addFullScreenEventListener();

    return () => {
      removeFullScreenEventListener();
    };
  }, []);

  return {
    togglePlayPause,
    playVideo,
    pauseVideo,
    forwardVideo,
    rewindVideo,
    toggleVolume,
    mute,
    unmute,
    paused,
    toggleFullScreen,
  };
};

export default useVideoControlEvents;
