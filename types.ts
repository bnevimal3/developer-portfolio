import React from 'react';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

// ImageSize type for high-fidelity AI image generation configuration
export type ImageSize = '1K' | '2K' | '4K';
