import useVideoControlEvents from "../../../hooks/useVideoControlEvents";
import classes from "./MobileLockUnlock.module.css";

const MobileLockUnlock = () => {
  const { toggleLockUnlockControls } = useVideoControlEvents();

  return (
    <div className={classes.container}>
      <div className={classes.icon_container}>
        <p style={{ color: "white" }} onClick={toggleLockUnlockControls}>
          {" "}
          Unlock
        </p>
      </div>
    </div>
  );
};

export default MobileLockUnlock;
