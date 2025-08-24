import React, { useRef, useEffect } from "react";

const ParallaxContainer = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const layers = container.querySelectorAll(".parallax-layer");
      layers.forEach((layer) => {
        layer.style.setProperty("--mx", `${x}`);
        layer.style.setProperty("--my", `${y}`);
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`parallax-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxContainer;
