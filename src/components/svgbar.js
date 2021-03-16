import React from "react";

const SvgGrad = ({ gradient }) => {
  const stops = gradient.asStops();
  const offsets = gradient.offsets;
  return (
    // <svg version="1.1">
    <defs>
      <linearGradient id={gradient.id}>
        {stops.map((s, i) => (
          <stop style={s} offset={offsets[i] + "%"} />
        ))}
      </linearGradient>
    </defs>
    // </svg>
  );
};

const SvgBarRender = ({ gradient, width = "200", height = "50" }) => {
  const gradURL = "#" + gradient.id;
  return (
    <svg
      version="1.1"
      baseProfile="full"
      preserveAspectRatio="none"
      width={width}
      height={height}
      viewBox="0 0 200 50"
    >
      <SvgGrad gradient={gradient} />
      <rect width="100%" height="100%" fill={`url(${gradURL})`} />
    </svg>
  );
};

export { SvgBarRender, SvgGrad };
