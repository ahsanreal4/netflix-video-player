import { memo } from "react";
import RewindTime from "../../../../../assets/rewind-time";
import useVideoControlEvents from "../../../../../hooks/useVideoControlEvents";

const RewindButton = () => {
  const { rewindVideo } = useVideoControlEvents();

  return (
    <div
      onClick={() => {
        rewindVideo();
      }}
    >
      <RewindTime className={"icon"} />
    </div>
  );
};

export default memo(RewindButton);
