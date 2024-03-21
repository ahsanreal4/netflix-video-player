import { useCallback, useRef } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { VideoEventListeners } from "../../../VideoPlayer.types";

const useDurationChangeEventListener = () => {
  const prevDurationRef = useRef<number>(0);

  const { videoRef, isLiveVideo, setIsLiveVideo } = useVideoContext();

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
  }, [isLiveVideo]);

  const addDurationChangeEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener(
      VideoEventListeners.DurationChange,
      onDurationChange
    );
  };

  const removeDurationChangeEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener(
      VideoEventListeners.DurationChange,
      onDurationChange
    );
  };

  return { removeDurationChangeEventListener, addDurationChangeEventListener };
};

export default useDurationChangeEventListener;
