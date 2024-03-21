import Slider from "rc-slider";

import classes from "./VideoProgressSlider.module.css";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

const color = "red";

const VideoProgressSlider = () => {
  const { videoRef, paused, isLiveVideo, videoPlayerProps } = useVideoContext();
  const { controls } = videoPlayerProps;
  const { disableProgressBar, disableTime } = controls;

  const [currentTime, setCurrentTime] = useState<string>("");
  const [videoTotalTime, setVideoTotalTime] = useState<string>("");
  const [sliderPercentage, setSliderPercentage] = useState<number>(0);

  const getFormattedTime = (time: number) =>
    time > 0 && time < 10 ? "0" + time.toString() : time;

  const getSecondFormattedTime = (time: number) =>
    time < 10 ? "0" + time.toString() : time.toString();

  const updateVideoTimeStates = (time: number, duration: number) => {
    const progressPercentage = (time / duration) * 100;

    let hours = Math.floor(time / (60 * 60));
    let minutes = Math.floor(time / 60);
    if (minutes >= 60) {
      minutes = minutes % 60;
    }

    const seconds = Math.floor(time % 60);

    let currentTimeStr = "";
    if (hours > 0) {
      currentTimeStr += getFormattedTime(hours) + ":";
    }

    let minuteStr =
      hours > 0 ? getSecondFormattedTime(minutes) : getFormattedTime(minutes);
    minuteStr += ":";

    currentTimeStr += minuteStr + getSecondFormattedTime(seconds);

    setCurrentTime(currentTimeStr);
    setSliderPercentage(progressPercentage);
  };

  const addProgressEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("timeupdate", () => {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      updateVideoTimeStates(videoElement.currentTime, videoElement.duration);
    });
  };

  const removeProgressEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener("timeupdate", () => {});
  };

  const initializeVideoStartingTime = () => {
    if (!videoRef.current) return;

    updateVideoTimeStates(
      videoRef.current.currentTime,
      videoRef.current.duration
    );
  };

  const initializeVideoTotalTime = () => {
    const duration = videoRef.current?.duration;

    if (!duration) return;

    const hours = Math.floor(duration / (60 * 60));
    let minutes = Math.floor(duration / 60);
    if (minutes >= 60) {
      minutes = minutes % 60;
    }
    const seconds = Math.floor(duration % 60);

    let totalTimeStr = "";
    if (hours > 0) {
      totalTimeStr += getFormattedTime(hours) + ":";
    }

    let minuteStr =
      hours > 0 ? getSecondFormattedTime(minutes) : getFormattedTime(minutes);
    minuteStr += ":";

    totalTimeStr += minuteStr + getSecondFormattedTime(seconds);

    setCurrentTime("0:00");
    setVideoTotalTime(totalTimeStr);
  };

  useEffect(() => {
    initializeVideoStartingTime();
    addProgressEventListener();

    return () => {
      removeProgressEventListener();
    };
  }, []);

  useEffect(() => {
    if (videoTotalTime.length > 0 || isLiveVideo) return;
    initializeVideoTotalTime();
  }, [paused]);

  return (
    <div className={classes.container}>
      {isLiveVideo || disableProgressBar ? null : (
        <Slider
          style={{ cursor: "grab" }}
          styles={{
            track: { backgroundColor: color, height: isMobile ? 5 : 7 },
            handle: {
              color: color,
              backgroundColor: color,
              border: isMobile ? "1px solid red" : "2px solid red",
              boxShadow: isMobile ? "0 0 0 1px red" : "0 0 0 2px red",
              top: isMobile ? 6 : 6,
            },
            rail: {
              height: isMobile ? 5 : 7,
              backgroundColor: "gray",
            },
          }}
          onChange={(value: number | number[]) => {
            if (typeof value == "number") {
              if (typeof videoRef.current?.currentTime != "number") return;

              const percentage = value / 100;
              videoRef.current.currentTime =
                percentage * videoRef.current.duration;
            }
          }}
          defaultValue={0}
          value={sliderPercentage}
          step={0.01}
        />
      )}

      {videoTotalTime.length != 0 &&
      isLiveVideo == false &&
      disableTime == false ? (
        <p className={classes.remaining_time_text}>
          {currentTime}&nbsp;:&nbsp;{videoTotalTime}
        </p>
      ) : null}
      {isLiveVideo ? (
        <p className={`${classes.remaining_time_text} ${classes.live_text}`}>
          <strong className={classes.bullet}>&#8226;</strong>&nbsp;Live
        </p>
      ) : null}
    </div>
  );
};

export default VideoProgressSlider;
