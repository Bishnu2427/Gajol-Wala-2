import { forwardRef } from "react";

// <img> that quietly hides itself if the URL fails, so the neutral placeholder shows instead.
const Img = forwardRef(function Img(props, ref) {
  return (
    <img
      ref={ref}
      loading="lazy"
      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
      {...props}
    />
  );
});

export default Img;
