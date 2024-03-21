import { useEffect } from "react";
import { useVideoContext } from "../../context/VideoContextProvider";
import { isMobile } from "react-device-detect";

import useGetAllEventListeners from "./components/useGetAllEventListeners";

const useVideoEventListeners = (
  togglePlayPause: () => void,
  rewindVideo: () => void,
  forwardVideo: () => void
) => {
  const {
    addDurationChangeEventListener,
    addFullScreenEventListener,
    addKeyboardEventListener,
    addLoadEventListener,
    addMouseMoveEventListeners,
    addVideoClickEventListener,
    addVideoEndedEventListener,
    onOverlayClick,
    removeDurationChangeEventListener,
    removeFullScreenEventListener,
    removeKeyboardEventListener,
    removeLoadEventListener,
    removeMouseMoveEventListeners,
    removeVideoClickEventListener,
    removeVideoEndedEventListener,
  } = useGetAllEventListeners(togglePlayPause, rewindVideo, forwardVideo);

  const { isLiveVideo, videoPlayerProps, unableToPlayVideo, videoLoading } =
    useVideoContext();
  const { disableControls, loopVideo, disableKeyboardArrowEventListeners } =
    videoPlayerProps;

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
    initializeEventListeners();

    return () => {
      removeAllEventListeners();
    };
  }, [disableControls, videoLoading, loopVideo, isLiveVideo]);

  useEffect(() => {
    if (unableToPlayVideo == true) {
      removeAllEventListeners();
    }
  }, [unableToPlayVideo]);

  return {
    onOverlayClick,
  };
};

export default useVideoEventListeners;
