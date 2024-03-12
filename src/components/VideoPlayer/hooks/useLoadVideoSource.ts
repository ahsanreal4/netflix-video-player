import { useEffect } from "react";
import { VideoFormats } from "../VideoPlayer.types";
import Hls from "hls.js";
import { useVideoContext } from "../context/VideoContextProvider";

const useLoadVideoSource = (playVideo: () => void) => {
  const { videoPlayerProps, videoRef } = useVideoContext();
  const { src, autoPlay } = videoPlayerProps;

  const isSimpleVideoFormat = (format: string) => {
    const SIMPLE_VIDEO_FORMATS: string[] = [
      VideoFormats.FLV,
      VideoFormats.MOV,
      VideoFormats.MPEG4,
      VideoFormats.MP4,
    ];

    return SIMPLE_VIDEO_FORMATS.includes(format);
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
    if (isSimpleVideoFormat(format)) {
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
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    } else {
      videoRef.current.src = src;
    }

    playVideoOnMount();
  };

  useEffect(() => {
    if (src.length == 0) return;

    loadVideoSource();
  }, [src]);

  return null;
};

export default useLoadVideoSource;
