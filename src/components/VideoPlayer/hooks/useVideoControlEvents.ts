import { RefObject, useEffect, useState } from "react";
import { Volume } from "../VideoPlayer.types";

interface UseVideoControlEventsProps {
  videoRef: RefObject<HTMLVideoElement>;
  fullScreenOnStart: boolean;
}

const useVideoControlEvents = ({
  videoRef,
  fullScreenOnStart,
}: UseVideoControlEventsProps) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [fullScreen, setFullScreen] = useState<boolean>(fullScreenOnStart);

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
          setFullScreen(false);
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

    setFullScreen(false);
  };

  const enterFullScreen = () => {
    if (!videoRef.current) return;

    document.getElementById("video-main_container_999")?.requestFullscreen();

    // if (videoRef.current.requestFullscreen) {
    //   videoRef.current.requestFullscreen();
    //   // @ts-ignore
    // } else if (videoRef.current.webkitRequestFullscreen) {
    //   /* Safari */
    //   // @ts-ignore
    //   videoRef.current.webkitRequestFullscreen();
    //   // @ts-ignore
    // } else if (videoRef.current.msRequestFullscreen) {
    //   /* IE11 */
    //   // @ts-ignore
    //   videoRef.current.msRequestFullscreen();
    // }

    setFullScreen(true);
  };

  const toggleFullScreen = () => {
    if (fullScreen) {
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
    fullScreen,
    toggleFullScreen,
  };
};

export default useVideoControlEvents;
