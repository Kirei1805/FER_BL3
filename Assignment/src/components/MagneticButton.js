import React, { useRef, useEffect } from "react";

const MagneticButton = ({ children, className = "", strength = 30 }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const centerX = width / 2;
      const centerY = height / 2;

      const deltaX = ((x - centerX) / centerX) * strength;
      const deltaY = ((y - centerY) / centerY) * strength;

      button.style.setProperty("--mx", `${deltaX}px`);
      button.style.setProperty("--my", `${deltaY}px`);
    };

    const handleMouseLeave = () => {
      button.style.setProperty("--mx", "0px");
      button.style.setProperty("--my", "0px");
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`}>
      {children}
    </button>
  );
};

export default MagneticButton;
