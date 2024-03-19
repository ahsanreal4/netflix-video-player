import { memo } from "react";
import { useVideoContext } from "../../context/VideoContextProvider";
import UnableToPlayVideo from "./components/UnableToPlayVideo";
import LoadingSpinner from "./components/LoadingSpinner";
import OverlayContainer from "./components/OverlayContainer";

const Overlay = () => {
  const { videoLoaded, showOverlay, unableToPlayVideo } = useVideoContext();

  return (
    <>
      {showOverlay ? <OverlayContainer /> : null}
      <LoadingSpinner videoLoaded={videoLoaded} />
      <UnableToPlayVideo unableToPlayVideo={unableToPlayVideo} />
    </>
  );
};

export default memo(Overlay);
