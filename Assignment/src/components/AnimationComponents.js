import React from "react";
import "./Animations.css";

export const FadeIn = ({ children }) => (
  <div className="fade-in">{children}</div>
);

export const PopIn = ({ children }) => <div className="pop-in">{children}</div>;

export const SlideIn = ({ children, direction = "left" }) => (
  <div className={`slide-in-${direction}`}>{children}</div>
);

export const HoverCard = ({ children }) => (
  <div className="hover-card">{children}</div>
);

export const Button3D = ({ children, onClick }) => (
  <button className="button-3d" onClick={onClick}>
    {children}
  </button>
);

export const RippleButton = ({ children, onClick }) => (
  <button className="ripple" onClick={onClick}>
    {children}
  </button>
);

export const LoadingShimmer = () => <div className="shimmer">Loading...</div>;

export const FloatingElement = ({ children }) => (
  <div className="float">{children}</div>
);

export const SwingingElement = ({ children }) => (
  <div className="swing">{children}</div>
);

export const SpotlightCard = ({ children }) => (
  <div className="spotlight">{children}</div>
);

export const GradientText = ({ children }) => (
  <span className="gradient-text-animated">{children}</span>
);

export const BreathingElement = ({ children }) => (
  <div className="breathing">{children}</div>
);
