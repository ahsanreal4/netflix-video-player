import { useCallback } from "react";
import { KeyCodes } from "../../../VideoPlayer.types";
import { useVideoContext } from "../../../context/VideoContextProvider";

const useKeyboardPressEventListener = (
  rewindVideo: () => void,
  forwardVideo: () => void
) => {
  const { videoPlayerProps, videoLoading } = useVideoContext();
  const { disableControls } = videoPlayerProps;

  const onKeyboardPress = useCallback(
    (event: KeyboardEvent) => {
      if (disableControls || videoLoading == true) return;

      if (event.key == KeyCodes.ArrowLeft) {
        rewindVideo();
      } else if (event.key == KeyCodes.ArrowRight) {
        forwardVideo();
      }
    },
    [disableControls, videoLoading]
  );

  const addKeyboardEventListener = () => {
    document.addEventListener("keydown", onKeyboardPress);
  };

  const removeKeyboardEventListener = () => {
    document.removeEventListener("keydown", onKeyboardPress);
  };

  return { addKeyboardEventListener, removeKeyboardEventListener };
};

export default useKeyboardPressEventListener;
