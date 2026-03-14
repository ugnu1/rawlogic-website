// Remotion Root — used by `npm run remotion:studio` and `npm run remotion:render`
// This file is NOT imported by the Next.js app router.
import { Composition } from "remotion";
import { AutonomousGrid } from "../components/AutonomousGrid";
import { MobileRefinery } from "../components/MobileRefinery";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AutonomousGrid"
      component={AutonomousGrid}
      durationInFrames={180}
      fps={30}
      width={1260}
      height={300}
    />
    <Composition
      id="MobileRefinery"
      component={MobileRefinery}
      durationInFrames={180}
      fps={30}
      width={300}
      height={600}
    />
  </>
);
