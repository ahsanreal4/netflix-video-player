import { useCallback, useEffect, useRef } from "react";
import { useVideoContext } from "../context/VideoContextProvider";
import { isMobile } from "react-device-detect";
import { KeyCodes } from "../VideoPlayer.types";

const useVideoEventListeners = (
  togglePlayPause: () => void,
  rewindVideo: () => void,
  forwardVideo: () => void
) => {
  const prevDurationRef = useRef<number>(0);
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();
  const hideMouseTimeoutRef = useRef<NodeJS.Timeout>();
  const videoLoadedRef = useRef<boolean>(false);
  const disableControlsRef = useRef<boolean>(false);

  const {
    setFullscreen,
    videoRef,
    setVideoLoading,
    isLiveVideo,
    setIsLiveVideo,
    setPaused,
    setShowOverlay,
    videoPlayerProps,
    unableToPlayVideo,
    containerRef,
    videoLoading,
  } = useVideoContext();
  const {
    displayControlsOnFirstRender,
    disableControls,
    loopVideo,
    disableKeyboardArrowEventListeners,
  } = videoPlayerProps;

  useEffect(() => {
    videoLoadedRef.current = videoLoading;
  }, [videoLoading]);

  useEffect(() => {
    disableControlsRef.current = disableControls;
  }, [disableControls]);

  const showCursor = () => {
    document.documentElement.style.cursor = "auto";
  };

  const hideCursor = () => {
    document.documentElement.style.cursor = "none";
  };

  const onFullScreenChange = useCallback(() => {
    // If full screen
    if (document.fullscreenElement) {
    }
    // If exiting fullscreen
    else {
      setFullscreen(false);
    }
  }, []);

  const addFullScreenEventListener = () => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener(
      "fullscreenchange",
      onFullScreenChange
    );
  };

  const removeFullScreenEventListener = () => {
    if (!containerRef.current) return;

    containerRef.current.removeEventListener(
      "fullscreenchange",
      onFullScreenChange
    );
  };

  const onVideoEnded = useCallback(() => {
    if (!videoRef.current) return;

    setPaused(true);

    // If loop video true we automatically start video
    if (!loopVideo) return;

    videoRef.current.currentTime = 0;
    setTimeout(() => {
      togglePlayPause();
    }, 500);
  }, [loopVideo]);

  const addVideoEndedEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("ended", onVideoEnded);
  };

  const removeVideoEndedEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("ended", onVideoEnded);
  };

  const onDurationChange = useCallback(() => {
    if (!videoRef.current || isLiveVideo == true) return;

    const durationInt = parseInt(videoRef.current.duration.toString());

    // Initialize duration at 0
    if (prevDurationRef.current == 0) {
      prevDurationRef.current = durationInt;
      return;
    }

    let diff = prevDurationRef.current - durationInt;

    if (diff < 0) diff = -diff;
    const MAX_DURATION_DIFFERENCE = 1;

    // If difference between previous duration and current duration is not greater than 1 then we just return
    if (diff <= MAX_DURATION_DIFFERENCE) {
      return;
    }
    setIsLiveVideo(true);
  }, []);

  const addDurationChangeEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("durationchange", onDurationChange);
  };

  const removeDurationChangeEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("durationchange", onDurationChange);
  };

  const onVideoLoad = useCallback(() => {
    setVideoLoading(false);
  }, []);

  const addLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadeddata", onVideoLoad);
  };

  const removeLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("loadeddata", onVideoLoad);
  };

  const mouseMoveTimeout = () => {
    const WAIT_TIME_BEFORE_HIDING_OVERLAY = 2000;

    mouseMoveTimeoutRef.current = setTimeout(() => {
      setShowOverlay(false);

      // Don't do cursor hide timeout for mobile screens
      if (isMobile) return;

      const CURSOR_WAIT_TIME = 1000;

      hideMouseTimeoutRef.current = setTimeout(() => {
        hideCursor();
      }, CURSOR_WAIT_TIME);
    }, WAIT_TIME_BEFORE_HIDING_OVERLAY);
  };

  const onMouseMove = useCallback(() => {
    if (disableControlsRef.current == true || videoLoadedRef.current == true)
      return;

    showCursor();
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);

    setShowOverlay(true);

    mouseMoveTimeout();
  }, []);

  const addMouseMoveEventListeners = () => {
    if (displayControlsOnFirstRender) onMouseMove();

    if (!containerRef.current) return;

    containerRef.current.addEventListener("mousemove", onMouseMove);
  };

  const removeMouseMoveEventListeners = () => {
    if (!containerRef.current) return;

    containerRef.current.removeEventListener("mousemove", onMouseMove);
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);
  };

  const clearMouseMoveTimeouts = () => {
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);
    if (hideMouseTimeoutRef.current) clearTimeout(hideMouseTimeoutRef.current);
    showCursor();
  };

  const onVideoClick = useCallback(() => {
    if (disableControlsRef.current == true || videoLoadedRef.current == true)
      return;

    if (isMobile) {
      setShowOverlay(true);
      onMouseMove();
      return;
    }

    clearMouseMoveTimeouts();
    togglePlayPause();
    setShowOverlay(true);
    onMouseMove();
  }, []);

  const addVideoClickEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("click", onVideoClick);
  };

  const removeVideoClickEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("click", onVideoClick);
  };

  const onKeyboardPress = useCallback((event: KeyboardEvent) => {
    if (disableControlsRef.current == true || videoLoadedRef.current == true)
      return;

    if (event.key == KeyCodes.ArrowLeft) {
      rewindVideo();
    } else if (event.key == KeyCodes.ArrowRight) {
      forwardVideo();
    }
  }, []);

  const addKeyboardEventListener = () => {
    if (!containerRef.current) return;

    document.addEventListener("keydown", onKeyboardPress);
  };

  const removeKeyboardEventListener = () => {
    if (!containerRef.current) return;

    document.removeEventListener("keydown", onKeyboardPress);
  };

  const initializeEventListeners = () => {
    addFullScreenEventListener();
    addVideoEndedEventListener();
    addDurationChangeEventListener();
    addLoadEventListener();
    addVideoClickEventListener();

    if (isMobile) return;

    // Desktop only event listeners
    addMouseMoveEventListeners();
    if (!disableKeyboardArrowEventListeners) addKeyboardEventListener();
  };

  const removeAllEventListeners = () => {
    removeFullScreenEventListener();
    removeVideoEndedEventListener();
    removeDurationChangeEventListener();
    removeLoadEventListener();
    removeVideoClickEventListener();

    if (isMobile) return;

    // Desktop only event listeners
    removeMouseMoveEventListeners();
    if (!disableKeyboardArrowEventListeners) removeKeyboardEventListener();
  };

  useEffect(() => {
    return () => {
      removeAllEventListeners();
    };
  }, []);

  useEffect(() => {
    if (unableToPlayVideo == true) {
      removeAllEventListeners();
    }
  }, [unableToPlayVideo]);

  return {
    clearMouseMoveTimeouts,
    onMouseMove,
    initializeEventListeners,
  };
};

export default useVideoEventListeners;
