import { useCallback } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";

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

  return { addFullScreenEventListener, removeFullScreenEventListener };
};

export default useFullScreenEventListener;
