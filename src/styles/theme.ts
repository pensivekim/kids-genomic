import type React from 'react';

export const FONT = "'Jua', 'system-ui', sans-serif";

// White text stroke for readability (dark text on light/colored backgrounds)
export const textStroke: React.CSSProperties = {
  textShadow: '-2px -2px 0 rgba(255,255,255,0.9), 2px -2px 0 rgba(255,255,255,0.9), -2px 2px 0 rgba(255,255,255,0.9), 2px 2px 0 rgba(255,255,255,0.9)',
};

// Dark stroke for light text on dark backgrounds
export const textStrokeDark: React.CSSProperties = {
  textShadow: '-1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3)',
};
