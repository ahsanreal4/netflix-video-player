import useDurationChangeEventListener from "./useDurationChangeEventListener";
import useFullScreenEventListener from "./useFullScreenEventListener";
import useKeyboardPressEventListener from "./useKeyboardPressEventListener";
import useMouseMoveEventListener from "./useMouseMoveEventListener";
import useOverlayClickEventListener from "./useOverlayClickEventListener";
import useVideoClickEventListener from "./useVideoClickEventListener";
import useVideoEndedEventListener from "./useVideoEndedEventListener";
import useVideoLoadedEventListener from "./useVideoLoadedEventListener";

const useGetAllEventListeners = (
  togglePlayPause: () => void,
  rewindVideo: () => void,
  forwardVideo: () => void
) => {
  const { addFullScreenEventListener, removeFullScreenEventListener } =
    useFullScreenEventListener();
  const { addVideoEndedEventListener, removeVideoEndedEventListener } =
    useVideoEndedEventListener(togglePlayPause);
  const { addDurationChangeEventListener, removeDurationChangeEventListener } =
    useDurationChangeEventListener();
  const { addLoadEventListener, removeLoadEventListener } =
    useVideoLoadedEventListener();
  const {
    addMouseMoveEventListeners,
    removeMouseMoveEventListeners,
    clearMouseMoveTimeouts,
    onMouseMove,
  } = useMouseMoveEventListener();
  const { addVideoClickEventListener, removeVideoClickEventListener } =
    useVideoClickEventListener(
      togglePlayPause,
      onMouseMove,
      clearMouseMoveTimeouts
    );
  const { addKeyboardEventListener, removeKeyboardEventListener } =
    useKeyboardPressEventListener(rewindVideo, forwardVideo);
  const { onOverlayClick } = useOverlayClickEventListener(
    togglePlayPause,
    onMouseMove,
    clearMouseMoveTimeouts
  );

  return {
    addFullScreenEventListener,
    removeFullScreenEventListener,
    addVideoEndedEventListener,
    removeVideoEndedEventListener,
    addDurationChangeEventListener,
    removeDurationChangeEventListener,
    addLoadEventListener,
    removeLoadEventListener,
    addMouseMoveEventListeners,
    removeMouseMoveEventListeners,
    addVideoClickEventListener,
    removeVideoClickEventListener,
    addKeyboardEventListener,
    removeKeyboardEventListener,
    onOverlayClick,
  };
};

export default useGetAllEventListeners;
