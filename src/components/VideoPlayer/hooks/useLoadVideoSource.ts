import { useEffect } from "react";
import { VideoFormats } from "../VideoPlayer.types";
import Hls from "hls.js";
import { useVideoContext } from "../context/VideoContextProvider";

const useLoadVideoSource = (playVideo: () => void) => {
  const { videoPlayerProps, videoRef } = useVideoContext();
  const { src, autoPlay } = videoPlayerProps;

  const isHlsFormat = (format: string) => {
    return format != VideoFormats.Mp4 && format != VideoFormats.FLV;
  };

  const getVideoFormat = (link: string): string => {
    const videoSplit = link.split(".");
    return videoSplit[videoSplit.length - 1];
  };

  const playVideoOnMount = () => {
    if (autoPlay) playVideo();
  };

  const loadVideoSource = () => {
    if (!videoRef.current) return;

    const format = getVideoFormat(src);

    // If not hls format meaning simple video then just run
    if (!isHlsFormat(format)) {
      videoRef.current.src = src;
      videoRef.current.addEventListener("loadedmetadata", function () {
        playVideoOnMount();
      });

      return;
    }

    // If video is hls format
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      playVideoOnMount();
    }
  };

  useEffect(() => {
    if (src.length == 0) return;

    loadVideoSource();
  }, [src]);

  return null;
};

export default useLoadVideoSource;
