import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2A221D",
          color: "#F5F0E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          letterSpacing: "-0.04em",
        }}
      >
        IT
      </div>
    ),
    { ...size },
  );
}
