import { useRef, useState } from "react";
import { Volume } from "../../../../../VideoPlayer.types";

import classes from "./VolumeButton.module.css";
import Slider from "rc-slider";
import VolumeFull from "../../../../../assets/volume-full";
import VolumeMute from "../../../../../assets/volume-mute";
import VolumeLow from "../../../../../assets/volume-low";
import VolumeMid from "../../../../../assets/volume-mid";

import "rc-slider/assets/index.css";
import { useVideoContext } from "../../../../../context/VideoContextProvider";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";

const VolumeButton = ({ color = "red" }) => {
  const isMouseOnVolumeIconRef = useRef<boolean>(false);
  const isMouseOnSliderRef = useRef<boolean>(false);

  const { videoPlayerProps } = useVideoContext();
  const { muted } = videoPlayerProps;

  const [volume, setVolume] = useState(muted ? Volume.Mute : Volume.Full);
  const [displayVolumeSlider, setDisplayVolumeSlider] = useState(false);

  const { unmute, mute, toggleVolume } = useVideoControlEvents();

  const handleVolumeClick = () => {
    if (volume == 0) {
      unmute();
      setVolume(1);
    } else {
      mute();
      setVolume(0);
    }
  };

  const showSlider = () => {
    if (!isMouseOnVolumeIconRef.current) return;

    setDisplayVolumeSlider(true);
  };

  const hideSlider = () => {
    if (
      isMouseOnSliderRef.current == true ||
      isMouseOnVolumeIconRef.current == true
    )
      return;

    setDisplayVolumeSlider(false);
  };

  return (
    <div>
      <div
        onClick={handleVolumeClick}
        onMouseEnter={() => {
          isMouseOnVolumeIconRef.current = true;

          setTimeout(() => {
            showSlider();
          }, 300);
        }}
        onMouseLeave={() => {
          isMouseOnVolumeIconRef.current = false;

          if (displayVolumeSlider != true) return;

          setTimeout(() => {
            hideSlider();
          }, 1500);
        }}
      >
        {volume == Volume.Mute ? (
          <VolumeMute className={`icon ${classes.icon}`} />
        ) : null}
        {volume >= Volume.MidPoint ? (
          <VolumeFull className={`icon ${classes.icon}`} />
        ) : null}
        {volume != Volume.Mute && volume <= Volume.LowPoint ? (
          <VolumeLow className={`icon ${classes.icon}`} />
        ) : null}
        {volume > Volume.LowPoint && volume < Volume.MidPoint ? (
          <VolumeMid className={`icon ${classes.icon}`} />
        ) : null}
      </div>
      {displayVolumeSlider ? (
        <div
          onMouseEnter={() => {
            isMouseOnSliderRef.current = true;
          }}
          onMouseLeave={() => {
            isMouseOnSliderRef.current = false;

            setTimeout(() => {
              hideSlider();
            }, 1500);
          }}
          className={classes.slider_container}
        >
          <Slider
            styles={{
              track: { backgroundColor: color },
              handle: {
                color: color,
                backgroundColor: color,
                borderColor: color,
              },
              rail: {},
            }}
            dotStyle={{ color: color }}
            activeDotStyle={{ color: color }}
            vertical
            onChange={(value: number | number[]) => {
              if (typeof value == "number") {
                const volumeValue = value / 100;

                toggleVolume(volumeValue);
                setVolume(volumeValue);
              }
            }}
            defaultValue={volume * 100}
            value={volume * 100}
            step={0.1}
          />
        </div>
      ) : null}
    </div>
  );
};

export default VolumeButton;
