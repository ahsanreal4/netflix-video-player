import classes from "../Overlay.module.css";

interface LoadingSpinnerProps {
  videoLoaded: boolean;
}

const LoadingSpinner = ({ videoLoaded }: LoadingSpinnerProps) => {
  if (videoLoaded) return null;

  return (
    <div className={classes.loading_spinner_container}>
      <div className={classes.loading_spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
