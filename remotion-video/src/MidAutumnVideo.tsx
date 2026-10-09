import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig } from "remotion";
import { PhotoScene } from "./PhotoScene";

export const MidAutumnVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="中秋賀卡" durationInFrames={48} premountFor={fps}>
        <PhotoScene src="p1.jpg" zoomFrom={1} zoomTo={1.06} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="阿城生日" durationInFrames={46} premountFor={fps}>
        <PhotoScene src="p2.jpg" zoomFrom={1.04} zoomTo={1.1} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="聚餐合照" durationInFrames={46} premountFor={fps}>
        <PhotoScene src="p3.jpg" caption="月圓人團圓" zoomFrom={1} zoomTo={1.07} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="聚餐側拍" durationInFrames={46} premountFor={fps}>
        <PhotoScene
          src="p4.jpg"
          caption="幸福常相伴"
          subCaption="中秋快樂 · 生日快樂"
          zoomFrom={1.06}
          zoomTo={1}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
