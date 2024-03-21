import { isMobile } from "react-device-detect";
import { useVideoContext } from "../../../context/VideoContextProvider";

const useOverlayClickEventListener = (
  togglePlayPause: () => void,
  onMouseMove: () => void,
  clearMouseMoveTimeouts: () => void
) => {
  const { videoPlayerProps, setShowOverlay, videoFirstTimeLoaded } =
    useVideoContext();
  const { disableControls } = videoPlayerProps;

  const onOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disableControls || videoFirstTimeLoaded == false) return;

    const element: HTMLDivElement = event?.target as HTMLDivElement;

    if (!element) return;

    const dataAttr = element.attributes.getNamedItem("data-attr");

    // Overlay is clicked if dataAttr is not null
    if (!dataAttr) {
      if (isMobile) {
        clearMouseMoveTimeouts();
        onMouseMove();
      }
      return;
    }

    if (isMobile) {
      setShowOverlay(false);
      clearMouseMoveTimeouts();
      return;
    }

    clearMouseMoveTimeouts();
    togglePlayPause();
  };

  return { onOverlayClick };
};

export default useOverlayClickEventListener;
