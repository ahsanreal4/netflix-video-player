import { useCallback } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { VideoEventListeners } from "../../../VideoPlayer.types";

const useVideoLoadedEventListener = () => {
  const { setVideoLoading, videoRef } = useVideoContext();

  const onVideoLoad = useCallback(() => {
    setVideoLoading(false);
  }, []);

  const addLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener(VideoEventListeners.Loaded, onVideoLoad);
  };

  const removeLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener(
      VideoEventListeners.Loaded,
      onVideoLoad
    );
  };

  return { addLoadEventListener, removeLoadEventListener };
};

export default useVideoLoadedEventListener;
