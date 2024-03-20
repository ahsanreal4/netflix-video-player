import { memo } from "react";
import { useVideoContext } from "../../context/VideoContextProvider";
import UnableToPlayVideo from "./components/UnableToPlayVideo";
import LoadingSpinner from "./components/LoadingSpinner";
import OverlayContainer from "./components/OverlayContainer/OverlayContainer";

const Overlay = () => {
  const { videoLoading, showOverlay, unableToPlayVideo } = useVideoContext();

  return (
    <>
      {showOverlay ? <OverlayContainer /> : null}
      <LoadingSpinner videoLoading={videoLoading} />
      <UnableToPlayVideo unableToPlayVideo={unableToPlayVideo} />
    </>
  );
};

export default memo(Overlay);
