import CrossOutlined from "../../../assets/cross-outlined";
import classes from "../Overlay.module.css";

interface UnableToPlayVideoProps {
  unableToPlayVideo: boolean;
}

const UnableToPlayVideo = ({ unableToPlayVideo }: UnableToPlayVideoProps) => {
  if (unableToPlayVideo == false) return null;

  return (
    <div className={classes.unable_to_load_container}>
      <CrossOutlined />
      <p>Video unavailable</p>
    </div>
  );
};

export default UnableToPlayVideo;
