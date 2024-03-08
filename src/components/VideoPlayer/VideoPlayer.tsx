import { useEffect, useRef } from "react";
import { VideoInfo } from "../../data/VideoPlayer";
import "./VideoPlayer.css";
import Hls from "hls.js";
import { VideoFormats, VideoPlayerProps } from "./VideoPlayer.types";

const VideoPlayer = ({
  autoPlay = false,
  muted = false,
  src = "",
  resizeMode = "fill",
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getVideoFormat = (link: string): string => {
    const videoSplit = link.split(".");
    return videoSplit[videoSplit.length - 1];
  };

  const isHlsFormat = (format: string) => {
    return format != VideoFormats.Mp4 && format != VideoFormats.FLV;
  };

  const playVideoOnMount = () => {
    // @ts-expect-error
    if (autoPlay) videoRef.current.play();
  };

  // @ts-expect-error
  const playVideo = () => videoRef.current.play();

  // @ts-expect-error
  const pauseVideo = () => videoRef.current.pause();

  const togglePlayPause = () => {
    if (videoRef.current?.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const loadVideoSource = () => {
    if (!videoRef.current) return;

    const format = getVideoFormat(VideoInfo.link);

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
  }, []);

  return (
    <div className="video_container">
      <div style={{ position: "absolute", top: "45%", left: "48%", zIndex: 2 }}>
        <button
          style={{ fontSize: "32px", padding: "5px 10px", borderRadius: 10 }}
          onClick={() => {
            togglePlayPause();
          }}
        >
          Play
        </button>
      </div>

      <video
        ref={videoRef}
        id="video"
        controls={false}
        className="video"
        poster={VideoInfo.waitingImage}
        muted={muted}
        style={{ objectFit: resizeMode }}
      />
    </div>
  );
};

export default VideoPlayer;
