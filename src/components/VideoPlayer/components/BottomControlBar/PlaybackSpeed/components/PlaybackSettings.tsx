import classes from "../PlaybackSpeed.module.css";

import { MutableRefObject, useEffect, useState } from "react";
import { PLAYBACK_SPEEDS, PlaybackRates } from "../../../../VideoPlayer.types";
import useVideoControlEvents from "../../../../hooks/useVideoControlEvents";
import { isMobile } from "react-device-detect";
import { useVideoContext } from "../../../../context/VideoContextProvider";

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
  const { setShowPlaybackSettings: setShowPlaybackSettingsState } =
    useVideoContext();
  const { getPlaybackRate, changePlaybackRate } = useVideoControlEvents();
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  useEffect(() => {
    setPlaybackRate(getPlaybackRate());
  }, []);

  const hidePlaybackSettings = () => {
    setShowPlaybackSettings(false);
    if (isMobile) setShowPlaybackSettingsState(false);
  };

  const updatePlaybacKRate = (rate: PlaybackRates) => {
    changePlaybackRate(rate);

    if (isMobile) {
      hidePlaybackSettings();
      return;
    }

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

      hidePlaybackSettings();
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
