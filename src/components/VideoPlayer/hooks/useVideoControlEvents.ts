import { isMobile } from "react-device-detect";
import { PlaybackRates, Volume } from "../VideoPlayer.types";
import { useVideoContext } from "../context/VideoContextProvider";

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
    setLockControls,
    setVideoPlayerProps,
    videoLoading,
    setShowPlaybackSettings,
    lockControls,
  } = useVideoContext();

  const { muted } = videoPlayerProps;

  const animate = (element: HTMLElement) => {
    const ANIMATION_DURATION = 500;
    element.style.display = "block";

    setTimeout(() => {
      element.style.display = "none";
    }, ANIMATION_DURATION);
  };

  const startAnimation = () => {
    // If loading spinner shows we hide animations
    if (videoLoading) return;

    setTimeout(() => {
      const image1 = document.getElementById("play_pause_animation_image");

      if (!image1) return;

      animate(image1);
    }, 0);
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
    hideOtherControls("play_pause");
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }

  function forwardVideo(time: number = 10) {
    hideOtherControls("rewind_forward");

    if (!videoRef.current) return;

    videoRef.current.currentTime += time;
  }

  function rewindVideo(time: number = 10) {
    hideOtherControls("rewind_forward");

    if (!videoRef.current) return;

    videoRef.current.currentTime -= time;
  }

  const toggleVolume = (volume: number = Volume.Full) => {
    hideOtherControls("volume");
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
    hideOtherControls("fullscreen");

    if (fullscreen) {
      exitFullscreen();
    } else {
      enterFullScreen();
    }
  };

  const toggleLockUnlockControls = () => {
    if (!lockControls) {
      hideOtherControls("lock");
    }

    setLockControls((prev) => !prev);
  };

  const changePlaybackRate = (rate: PlaybackRates) => {
    if (!videoRef.current) return;

    if (rate == "Normal") {
      videoRef.current.playbackRate = 1;
    } else {
      videoRef.current.playbackRate = Number(rate);
    }
  };

  const getPlaybackRate = (): number => {
    if (!videoRef.current) return 1;

    return videoRef.current.playbackRate;
  };

  function hideOtherControls(
    currentControl:
      | "fullscreen"
      | "play_pause"
      | "rewind_forward"
      | "volume"
      | "playback"
      | "lock"
      | "progress_slider"
  ) {
    if (currentControl != "playback" && isMobile)
      setShowPlaybackSettings(false);
  }

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
    toggleLockUnlockControls,
    changePlaybackRate,
    getPlaybackRate,
    hideOtherControls,
  };
};

export default useVideoControlEvents;
