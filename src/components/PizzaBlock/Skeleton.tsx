import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466.8}
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="128" r="125" />
    <rect x="1" y="275" rx="10" ry="10" width="280" height="25" />
    <rect x="6" y="316" rx="10" ry="10" width="270" height="87" />
    <rect x="-1" y="425" rx="10" ry="10" width="93" height="28" />
    <rect x="19" y="98" rx="0" ry="0" width="6" height="9" />
    <rect x="125" y="416" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
