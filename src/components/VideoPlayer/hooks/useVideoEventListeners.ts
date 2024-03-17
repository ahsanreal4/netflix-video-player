import { useCallback, useEffect, useRef } from "react";
import { useVideoContext } from "../context/VideoContextProvider";
import { isMobile } from "react-device-detect";

const useVideoEventListeners = (togglePlayPause: () => void) => {
  const prevDurationRef = useRef<number>(0);
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();
  const hideMouseTimeoutRef = useRef<NodeJS.Timeout>();
  const videoLoadedRef = useRef<boolean>(false);

  const {
    setFullscreen,
    videoRef,
    setVideoLoaded,
    isLiveVideo,
    setIsLiveVideo,
    setPaused,
    setShowOverlay,
    videoPlayerProps,
    unableToPlayVideo,
    containerRef,
    videoLoaded,
  } = useVideoContext();
  const { displayControlsOnFirstRender, disableControls } = videoPlayerProps;

  useEffect(() => {
    videoLoadedRef.current = videoLoaded;
  }, [videoLoaded]);

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

    videoRef.current.currentTime = 0;
    setPaused(true);
  }, []);

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
    setVideoLoaded(true);
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
    if (videoLoadedRef.current == false) return;

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
    if (disableControls || videoLoadedRef.current == false) return;

    if (isMobile) {
      setShowOverlay(true);
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

  const addAllEventListeners = () => {
    addFullScreenEventListener();
    addVideoEndedEventListener();
    addDurationChangeEventListener();
    addLoadEventListener();
    addVideoClickEventListener();

    if (isMobile) return;

    // Desktop only event listeners
    addMouseMoveEventListeners();
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
  };

  useEffect(() => {
    addAllEventListeners();

    return () => {
      removeAllEventListeners();
    };
  }, []);

  useEffect(() => {
    if (unableToPlayVideo == true) {
      removeAllEventListeners();
    }
  }, [unableToPlayVideo]);

  return { clearMouseMoveTimeouts, onMouseMove };
};

export default useVideoEventListeners;
