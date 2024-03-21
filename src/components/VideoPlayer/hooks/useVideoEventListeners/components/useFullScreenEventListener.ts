import { useCallback } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { VideoEventListeners } from "../../../VideoPlayer.types";

const useFullScreenEventListener = () => {
  const { containerRef, setFullscreen } = useVideoContext();

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
      VideoEventListeners.FullScreenChange,
      onFullScreenChange
    );
  };

  const removeFullScreenEventListener = () => {
    if (!containerRef.current) return;

    containerRef.current.removeEventListener(
      VideoEventListeners.FullScreenChange,
      onFullScreenChange
    );
  };

  return { addFullScreenEventListener, removeFullScreenEventListener };
};

export default useFullScreenEventListener;
