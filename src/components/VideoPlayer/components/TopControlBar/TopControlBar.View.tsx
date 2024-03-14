import ArrowBack from "../../assets/arrow-back";
import classes from "./TopControlBar.module.css";

interface TopControlBarViewProps {
  onBackClick: () => void;
}

const TopControlBarView = ({ onBackClick }: TopControlBarViewProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.icon_container} onClick={onBackClick}>
        <ArrowBack />
      </div>
    </div>
  );
};

export default TopControlBarView;
