import { useCallback, useRef } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { isMobile } from "react-device-detect";
import { VideoEventListeners } from "../../../VideoPlayer.types";

const useMouseMoveEventListener = () => {
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();
  const hideMouseTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    containerRef,
    setShowOverlay,
    videoLoading,
    videoPlayerProps,
    videoFirstTimeLoaded,
  } = useVideoContext();
  const { disableControls, displayControlsOnFirstRender } = videoPlayerProps;

  const showCursor = () => {
    document.documentElement.style.cursor = "auto";
  };

  const hideCursor = () => {
    document.documentElement.style.cursor = "none";
  };

  const clearMouseMoveTimeouts = () => {
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);
    if (hideMouseTimeoutRef.current) clearTimeout(hideMouseTimeoutRef.current);
    showCursor();
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
    if (disableControls || videoFirstTimeLoaded == false) return;

    showCursor();
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);

    setShowOverlay(true);

    mouseMoveTimeout();
  }, [disableControls, videoLoading]);

  const addMouseMoveEventListeners = () => {
    if (displayControlsOnFirstRender) onMouseMove();

    if (!containerRef.current) return;

    containerRef.current.addEventListener(
      VideoEventListeners.MouseMove,
      onMouseMove
    );
  };

  const removeMouseMoveEventListeners = () => {
    if (!containerRef.current) return;

    containerRef.current.removeEventListener(
      VideoEventListeners.MouseMove,
      onMouseMove
    );
    if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);
  };

  return {
    addMouseMoveEventListeners,
    removeMouseMoveEventListeners,
    clearMouseMoveTimeouts,
    showCursor,
    hideCursor,
    onMouseMove,
  };
};

export default useMouseMoveEventListener;
