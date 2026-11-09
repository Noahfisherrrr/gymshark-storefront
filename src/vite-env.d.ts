/// <reference types="vite/client" />

// @types/react has `fetchPriority` on <img>/<link>/<script> but not <video> —
// it's a valid HTML attribute there too (used for the hero banner's video).
declare namespace React {
  interface VideoHTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto'
  }
}
