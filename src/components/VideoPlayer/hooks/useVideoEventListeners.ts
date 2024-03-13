import { useEffect, useRef } from "react";
import { useVideoContext } from "../context/VideoContextProvider";

const useVideoEventListeners = () => {
  const prevDurationRef = useRef<number>(0);

  const {
    setFullscreen,
    videoRef,
    setVideoLoaded,
    isLiveVideo,
    setIsLiveVideo,
    setPaused,
  } = useVideoContext();

  const addFullScreenEventListener = () => {
    document
      .getElementById("video-main_container_999")
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
      .getElementById("video-main_container_999")
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

  useEffect(() => {
    addFullScreenEventListener();
    addVideoEndedEventListener();
    addDurationChangeEventListener();
    addLoadEventListener();

    return () => {
      removeFullScreenEventListener();
      removeVideoEndedEventListener();
      removeDurationChangeEventListener();
      removeLoadEventListener();
    };
  }, []);

  return {};
};

export default useVideoEventListeners;
