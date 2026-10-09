import { Composition } from "remotion";
import { MidAutumnVideo } from "./MidAutumnVideo";

// 48 + 46 + 46 + 46 frames minus three 12-frame transitions = 150 frames (5s)
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MidAutumnVideo"
        component={MidAutumnVideo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
