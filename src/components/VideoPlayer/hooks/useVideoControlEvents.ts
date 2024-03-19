import { isMobile } from "react-device-detect";
import { Volume } from "../VideoPlayer.types";
import { useVideoContext } from "../context/VideoContextProvider";
import useVideoEventListeners from "./useVideoEventListeners";

const useVideoControlEvents = () => {
  const {
    paused,
    fullscreen,
    setPaused,
    setFullscreen,
    videoRef,
    isLiveVideo,
    videoPlayerProps,
    containerRef,
    videoLoaded,
    setShowOverlay,
    setLockControls,
    setVideoPlayerProps,
  } = useVideoContext();

  const { disableControls, muted } = videoPlayerProps;

  const { clearMouseMoveTimeouts, onMouseMove } =
    useVideoEventListeners(togglePlayPause);

  const animate = (element: HTMLElement) => {
    const ANIMATION_DURATION = 500;

    element.animate(
      [
        {
          // width: "60px",
          // height: "60px",
          opacity: "1",
          display: "block",
        },
        {
          // width: "80px",
          // height: "80px",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: ANIMATION_DURATION,
      }
    );
  };

  const startAnimation = () => {
    const animationImage = document.getElementById(
      "play_pause_animation_image"
    );

    // If user clicks on video container so we need to start it when overlay shows
    if (!animationImage) {
      setTimeout(() => {
        const image = document.getElementById("play_pause_animation_image");
        if (image) animate(image);
      }, 0);

      return;
    }

    animate(animationImage);
  };

  const playVideo = () => {
    if (!videoRef.current) return;

    // If video live update stream to latest point
    if (isLiveVideo) {
      const BIG_VALUE = 100000;
      videoRef.current.currentTime += BIG_VALUE;
    }
    videoRef.current.play();
    setPaused(false);

    if (!isMobile) startAnimation();
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setPaused(true);
    if (!isMobile) startAnimation();
  };

  function togglePlayPause() {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }

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
    if (muted == true) {
      setVideoPlayerProps({ ...videoPlayerProps, muted: false });
    }

    videoRef.current.volume = volume;
  };

  const mute = () => {
    toggleVolume(Volume.Mute);
  };

  const unmute = () => toggleVolume();

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
    if (!containerRef.current) return;

    containerRef.current.requestFullscreen();

    setFullscreen(true);
  };

  const toggleFullScreen = () => {
    if (fullscreen) {
      exitFullscreen();
    } else {
      enterFullScreen();
    }
  };

  const onOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disableControls || videoLoaded == false) return;

    const element: HTMLDivElement = event?.target as HTMLDivElement;

    if (!element) return;

    const dataAttr = element.attributes.getNamedItem("data-attr");

    // Overlay is clicked if dataAttr is not null
    if (!dataAttr) {
      if (isMobile) {
        clearMouseMoveTimeouts();
        onMouseMove();
      }
      return;
    }

    if (isMobile) {
      setShowOverlay(false);
      clearMouseMoveTimeouts();
      return;
    }

    clearMouseMoveTimeouts();
    togglePlayPause();
  };

  const toggleLockUnlockControls = () => {
    setLockControls((prev) => !prev);
  };

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
    onOverlayClick,
    toggleLockUnlockControls,
  };
};

export default useVideoControlEvents;
