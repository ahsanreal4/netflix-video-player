import { useVideoContext } from "../../context/VideoContextProvider";
import TopControlBarView from "./TopControlBar.View";

const TopControlBar = () => {
  const { videoPlayerProps } = useVideoContext();
  const { navigation } = videoPlayerProps;

  const onBackClick = () => {
    try {
      navigation.goBack();
    } catch (err) {
      console.error("Error on Back button click: " + err);
    }
  };

  return <TopControlBarView onBackClick={onBackClick} />;
};

export default TopControlBar;
