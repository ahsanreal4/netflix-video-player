import { useCallback } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";

const useVideoLoadedEventListener = () => {
  const { setVideoLoading, videoRef } = useVideoContext();

  const onVideoLoad = useCallback(() => {
    setVideoLoading(false);
  }, []);

  const addLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadeddata", onVideoLoad);
  };

  const removeLoadEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("loadeddata", onVideoLoad);
  };

  return { addLoadEventListener, removeLoadEventListener };
};

export default useVideoLoadedEventListener;
