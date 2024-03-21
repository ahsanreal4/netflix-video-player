import { useCallback } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { isMobile } from "react-device-detect";
import { VideoEventListeners } from "../../../VideoPlayer.types";

const useVideoClickEventListener = (
  togglePlayPause: () => void,
  onMouseMove: () => void,
  clearMouseMoveTimeouts: () => void
) => {
  const {
    videoLoading,
    videoPlayerProps,
    videoRef,
    setShowOverlay,
    videoFirstTimeLoaded,
  } = useVideoContext();
  const { disableControls } = videoPlayerProps;

  const onVideoClick = useCallback(() => {
    if (disableControls || videoFirstTimeLoaded == false) return;

    if (isMobile) {
      setShowOverlay(true);
      onMouseMove();
      return;
    }

    clearMouseMoveTimeouts();
    togglePlayPause();
    setShowOverlay(true);
    onMouseMove();
  }, [disableControls, videoLoading, videoFirstTimeLoaded]);

  const addVideoClickEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener(VideoEventListeners.Click, onVideoClick);
  };

  const removeVideoClickEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener(
      VideoEventListeners.Click,
      onVideoClick
    );
  };

  return { addVideoClickEventListener, removeVideoClickEventListener };
};

export default useVideoClickEventListener;
