import { memo } from "react";
import RewindTime from "../../../../../assets/rewind-time";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";
import { useVideoContext } from "../../../../../context/VideoContextProvider";

const RewindButton = () => {
  const { videoPlayerProps, isLiveVideo } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { rewindVideo } = useVideoControlEvents();

  return (
    <>
      {controls.disableForwardRewindButtons || isLiveVideo ? null : (
        <div
          onClick={() => {
            rewindVideo();
          }}
        >
          <RewindTime className={"icon"} />
        </div>
      )}
    </>
  );
};

export default memo(RewindButton);
