import { useEffect, useRef } from "react";
import { useVideoContext } from "../context/VideoContextProvider";

const VIDEO_CONTAINER_ID = "video-main_container_999";

const useVideoEventListeners = () => {
  const prevDurationRef = useRef<number>(0);
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    setFullscreen,
    videoRef,
    setVideoLoaded,
    isLiveVideo,
    setIsLiveVideo,
    setPaused,
    setShowOverlay,
  } = useVideoContext();

  const showCursor = () => {
    document.documentElement.style.cursor = "auto";
  };

  const hideCursor = () => {
    document.documentElement.style.cursor = "none";
  };

  const addFullScreenEventListener = () => {
    document
      .getElementById(VIDEO_CONTAINER_ID)
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
      .getElementById(VIDEO_CONTAINER_ID)
      ?.removeEventListener("fullscreenchange", () => {});
  };

  const addVideoEndedEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("ended", () => {
      if (!videoRef.current) return;

      videoRef.current.currentTime = 0;
      setPaused(true);
    });
  };

  const removeVideoEndedEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("ended", () => {});
  };

  const addDurationChangeEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("durationchange", () => {
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
    });
  };

  const removeDurationChangeEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("durationchange", () => {});
  };

  const addLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadeddata", () => {
      setVideoLoaded(true);
    });
  };

  const removeLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("loadeddata", () => {});
  };

  const onMouseMove = () => {
    const WAIT_TIME_BEFORE_HIDING_OVERLAY = 2000;

    showCursor();
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);

    setShowOverlay(true);

    mouseMoveTimeoutRef.current = setTimeout(() => {
      setShowOverlay(false);

      const CURSOR_WAIT_TIME = 1000;

      setTimeout(() => {
        hideCursor();
      }, CURSOR_WAIT_TIME);
    }, WAIT_TIME_BEFORE_HIDING_OVERLAY);
  };

  const addMouseMoveEventListeners = () => {
    const container = document.getElementById(VIDEO_CONTAINER_ID);

    if (!container) return;

    container.addEventListener("mousemove", onMouseMove);
  };

  const removeMouseMoveEventListeners = () => {
    const container = document.getElementById(VIDEO_CONTAINER_ID);

    if (!container) return;

    container.removeEventListener("mousemove", () => {});
  };

  useEffect(() => {
    addFullScreenEventListener();
    addVideoEndedEventListener();
    addDurationChangeEventListener();
    addLoadEventListener();
    addMouseMoveEventListeners();

    return () => {
      removeFullScreenEventListener();
      removeVideoEndedEventListener();
      removeDurationChangeEventListener();
      removeLoadEventListener();
      removeMouseMoveEventListeners();
    };
  }, []);

  return { onMouseMove };
};

export default useVideoEventListeners;
