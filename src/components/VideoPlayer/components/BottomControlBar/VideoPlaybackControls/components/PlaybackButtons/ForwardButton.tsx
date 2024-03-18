import { memo } from "react";
import ForwardTime from "../../../../../assets/forward-time";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";

const ForwardButton = () => {
  const { forwardVideo } = useVideoControlEvents();

  return (
    <div
      onClick={() => {
        forwardVideo();
      }}
    >
      <ForwardTime className={"icon"} />
    </div>
  );
};

export default memo(ForwardButton);
