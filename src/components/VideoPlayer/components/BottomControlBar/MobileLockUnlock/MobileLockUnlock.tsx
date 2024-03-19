import Unlock from "../../../assets/unlock";
import useVideoControlEvents from "../../../hooks/useVideoControlEvents";
import classes from "./MobileLockUnlock.module.css";

const MobileLockUnlock = () => {
  const { toggleLockUnlockControls } = useVideoControlEvents();

  return (
    <div className={classes.container}>
      <div className={classes.icon_container}>
        <div
          className={classes.unlock_container}
          onClick={toggleLockUnlockControls}
        >
          <Unlock className={classes.unlock_icon} />
        </div>
      </div>
    </div>
  );
};

export default MobileLockUnlock;
