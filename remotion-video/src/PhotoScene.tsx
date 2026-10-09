import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";

// Subset of Noto Serif TC Bold containing only the caption characters
const serifTC = "Noto Serif TC";
loadFont({
  family: serifTC,
  url: staticFile("NotoSerifTC-Bold-subset.ttf"),
  weight: "700",
});

export type PhotoSceneProps = {
  src: string;
  caption?: string;
  subCaption?: string;
  zoomFrom?: number;
  zoomTo?: number;
};

export const PhotoScene: React.FC<PhotoSceneProps> = ({
  src,
  caption,
  subCaption,
  zoomFrom = 1,
  zoomTo = 1.08,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    extrapolateRight: "clamp",
  });
  const textIn = spring({ frame: frame - 6, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a120b" }}>
      {/* Blurred fill so portrait/landscape photos sit on a full square frame */}
      <AbsoluteFill>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(40px) brightness(0.55)",
            transform: "scale(1.2)",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </AbsoluteFill>
      {caption ? (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 110,
            background:
              "linear-gradient(to top, rgba(20,12,4,0.75) 0%, rgba(20,12,4,0) 38%)",
          }}
        >
          <div
            style={{
              fontFamily: serifTC,
              fontWeight: 700,
              fontSize: 92,
              letterSpacing: 12,
              color: "#f3d48a",
              textShadow: "0 4px 18px rgba(0,0,0,0.6)",
              opacity: textIn,
              transform: `translateY(${(1 - textIn) * 40}px)`,
            }}
          >
            {caption}
          </div>
          {subCaption ? (
            <div
              style={{
                fontFamily: serifTC,
                fontWeight: 700,
                fontSize: 46,
                letterSpacing: 6,
                color: "#fff6e0",
                marginTop: 14,
                opacity: textIn,
              }}
            >
              {subCaption}
            </div>
          ) : null}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
