"use client";

import { Player } from "@remotion/player";
import { AutonomousGrid } from "./AutonomousGrid";

export default function RemotionPlayerWrapper() {
  return (
    // Aspect-ratio wrapper forces height to scale with width,
    // giving Remotion a square container to fill correctly.
    <div style={{ width: "100%", aspectRatio: "1260 / 300", position: "relative" }}>
      <Player
        component={AutonomousGrid}
        durationInFrames={180}
        fps={30}
        compositionWidth={1260}
        compositionHeight={300}
        style={{ width: "100%", height: "100%", display: "block" }}
        autoPlay
        loop
        controls={false}
        initiallyShowControls={false}
      />
    </div>
  );
}
