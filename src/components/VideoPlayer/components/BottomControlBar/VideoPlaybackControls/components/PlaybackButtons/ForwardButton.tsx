import { memo } from "react";
import ForwardTime from "../../../../../assets/forward-time";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";
import { useVideoContext } from "../../../../../context/VideoContextProvider";

const ForwardButton = () => {
  const { videoPlayerProps, isLiveVideo } = useVideoContext();
  const { controls } = videoPlayerProps;

  const { forwardVideo } = useVideoControlEvents();

  return (
    <>
      {controls.disableForwardRewindButtons || isLiveVideo ? null : (
        <div
          onClick={() => {
            forwardVideo();
          }}
        >
          <ForwardTime className={"icon"} />
        </div>
      )}
    </>
  );
};

export default memo(ForwardButton);
