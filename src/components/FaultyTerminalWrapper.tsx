"use client";

import { Component, type ReactNode } from "react";
import { FaultyTerminal } from "./FaultyTerminal";

interface Props {
  tint?: string;
  brightness?: number;
  curvature?: number;
  mouseReact?: boolean;
  mouseStrength?: number;
  scale?: number;
  scanlineIntensity?: number;
  noiseAmp?: number;
  pageLoadAnimation?: boolean;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary wrapper for FaultyTerminal.
 * If WebGL or any other error occurs, it gracefully renders nothing
 * instead of crashing the entire app.
 */
export class FaultyTerminalWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error for debugging, but don't crash the app
    console.warn("FaultyTerminal error boundary caught:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render nothing - the page works fine without the background effect
      return null;
    }

    return <FaultyTerminal {...this.props} />;
  }
}
