// Remotion Root — used by `npm run remotion:studio` and `npm run remotion:render`
// This file is NOT imported by the Next.js app router.
import { Composition } from "remotion";
import { AutonomousGrid } from "../components/AutonomousGrid";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AutonomousGrid"
      component={AutonomousGrid}
      durationInFrames={180}   // 6 seconds at 30fps
      fps={30}
      width={1280}
      height={420}
    />
  </>
);
