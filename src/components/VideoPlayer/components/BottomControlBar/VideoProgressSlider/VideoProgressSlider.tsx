import Slider from "rc-slider";

import classes from "./VideoProgressSlider.module.css";
import { useState } from "react";

const color = "red";

const VideoProgressSlider = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className={classes.container}>
      <Slider
        styles={{
          track: { backgroundColor: color },
          handle: {
            color: color,
            backgroundColor: color,
            borderColor: color,
          },
          rail: {
            backgroundColor: "gray",
          },
        }}
        dotStyle={{ color: color }}
        activeDotStyle={{ color: color }}
        onChange={(value: number | number[]) => {
          if (typeof value == "number") {
          }
        }}
        defaultValue={50}
      />
    </div>
  );
};

export default VideoProgressSlider;
