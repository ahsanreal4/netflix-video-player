import { MutableRefObject, useEffect, useState } from "react";
import { PLAYBACK_SPEEDS, PlaybackRates } from "../../../../VideoPlayer.types";
import useVideoControlEvents from "../../../../hooks/useVideoControlEvents";
import classes from "../PlaybackSpeed.module.css";

interface PlaybackSettingsProps {
  isMouseOnContainerRef: MutableRefObject<boolean>;
  isMouseOnIconRef: MutableRefObject<boolean>;
  setShowPlaybackSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaybackSettings = ({
  isMouseOnContainerRef,
  isMouseOnIconRef,
  setShowPlaybackSettings,
}: PlaybackSettingsProps) => {
  const { getPlaybackRate, changePlaybackRate } = useVideoControlEvents();
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  useEffect(() => {
    setPlaybackRate(getPlaybackRate());
  }, []);

  const updatePlaybacKRate = (rate: PlaybackRates) => {
    changePlaybackRate(rate);
    setPlaybackRate(getPlaybackRate());
  };

  const isActiveSpeed = (rate: PlaybackRates) => {
    if (rate == "Normal" && playbackRate == 1) return true;

    return Number(rate) == playbackRate;
  };

  const onMouseEnter = () => {
    isMouseOnContainerRef.current = true;
  };

  const onMouseLeave = () => {
    isMouseOnContainerRef.current = false;

    const WAIT_TIMEOUT = 500;

    setTimeout(() => {
      // If Mouse is on icon or container then don't hide
      if (
        isMouseOnContainerRef.current == true ||
        isMouseOnIconRef.current == true
      )
        return;

      setShowPlaybackSettings(false);
    }, WAIT_TIMEOUT);
  };

  return (
    <div
      className={classes.playback_settings_container}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={classes.playback_speeds_container}>
        {PLAYBACK_SPEEDS.map((speed: PlaybackRates, index: number) => (
          <div
            className={classes.playback_speeds_item}
            key={`playback-speed-${index}`}
            onClick={() => {
              updatePlaybacKRate(speed);
            }}
          >
            <p>
              {isActiveSpeed(speed) ? "✔" : null} {speed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaybackSettings;
