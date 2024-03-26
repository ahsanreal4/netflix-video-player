const Play = ({
  width = "24",
  height = "24",
  className = "image",
  color = "white",
  id = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      id={id}
    >
      <path
        d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
        fill={color}
      ></path>
    </svg>
  );
};

export default Play;