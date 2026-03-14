"use client";

import { Player } from "@remotion/player";
import { MobileRefinery } from "./MobileRefinery";

export default function MobileRefineryPlayer() {
  return (
    <div style={{ width: "100%", aspectRatio: "300 / 600", position: "relative" }}>
      <Player
        component={MobileRefinery}
        durationInFrames={180}
        fps={30}
        compositionWidth={300}
        compositionHeight={600}
        style={{ width: "100%", height: "100%", display: "block" }}
        autoPlay
        loop
        controls={false}
        initiallyShowControls={false}
      />
    </div>
  );
}
