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
    setShowOverlay,
  } = useVideoContext();
  const { onMouseMove } = useVideoEventListeners();

  const startAnimation = () => {
    const animationImage = document.getElementById(
      "play_pause_animation_image"
    );

    const animationContainer = document.getElementById(
      "play_pause_animation_container"
    );

    if (!animationImage || !animationContainer) return;

    const ANIMATION_DURATION = 350;

    animationImage.animate(
      [
        {
          width: "60px",
          height: "60px",
          opacity: "1",
          display: "block",
        },
        {
          width: "70px",
          height: "70px",
          opacity: "0.75",
        },
        {
          width: "75px",
          height: "75px",
          opacity: "0.75",
        },
        {
          width: "80px",
          height: "80px",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: ANIMATION_DURATION,
      }
    );

    animationContainer.animate(
      [
        {
          top: "calc(50% - 110px)",
          left: "calc(50% - 55px)",
        },
        {
          top: "calc(50% - 115px)",
          left: "calc(50% - 65px)",
        },
        {
          top: "calc(50% - 115px)",
          left: "calc(50% - 70px)",
        },
        {
          top: "calc(50% - 115px)",
          left: "calc(50% - 75px)",
        },
      ],
      {
        duration: ANIMATION_DURATION,
      }
    );
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
    startAnimation();
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setPaused(true);
    startAnimation();
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

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const element: HTMLDivElement = event.target as HTMLDivElement;

    if (!element) return;

    const dataAttr = element.attributes.getNamedItem("data-attr");

    // Overlay is clicked if dataAttr is not null
    if (!dataAttr) return;

    togglePlayPause();
  };

  const handleVideoClick = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    togglePlayPause();
    setShowOverlay(true);
    onMouseMove();
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
    handleOverlayClick,
    handleVideoClick,
  };
};

export default useVideoControlEvents;
