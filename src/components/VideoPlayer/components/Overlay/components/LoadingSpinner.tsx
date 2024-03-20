import classes from "../Overlay.module.css";

interface LoadingSpinnerProps {
  videoLoading: boolean;
}

const LoadingSpinner = ({ videoLoading }: LoadingSpinnerProps) => {
  if (!videoLoading) return null;

  return (
    <div className={classes.loading_spinner_container}>
      <div className={classes.loading_spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
