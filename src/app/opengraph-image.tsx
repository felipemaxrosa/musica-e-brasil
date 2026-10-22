import { ImageResponse } from "next/og";

export const alt = "Escola de Música E-Brasil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0c",
          color: "#f4efe3",
          padding: 90,
        }}
      >
        <div style={{ fontSize: 30, color: "#e8c87e", letterSpacing: 6 }}>
          ESCOLA DE MÚSICA · DESDE 2006
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          Realize seu sonho de tocar ou cantar
        </div>
        <div style={{ fontSize: 30, color: "#a7a19a", marginTop: 28 }}>
          A maior escola de música do Litoral Norte · Caraguatatuba
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#e8c87e", marginTop: 44 }}>
          E-Brasil
        </div>
      </div>
    ),
    { ...size },
  );
}
