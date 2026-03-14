"use client";

import { Player } from "@remotion/player";
import { AutonomousGrid } from "./AutonomousGrid";

export default function RemotionPlayerWrapper() {
  return (
    <Player
      component={AutonomousGrid}
      durationInFrames={180}
      fps={30}
      compositionWidth={1280}
      compositionHeight={420}
      style={{ width: "100%", display: "block" }}
      autoPlay
      loop
      controls={false}
      initiallyShowControls={false}
    />
  );
}
