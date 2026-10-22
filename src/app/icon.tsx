import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

/** Favicon: o logo oficial (mesmo da navbar) centralizado num quadrado preto. */
export default function Icon() {
  const data = readFileSync(join(process.cwd(), "public/logo.jpg"));
  const src = `data:image/jpeg;base64,${data.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0c",
        }}
      >
        {/* 960x751 → encaixa pela largura (256x200), sem distorcer */}
        <img src={src} width={256} height={200} alt="E-Brasil" />
      </div>
    ),
    { ...size },
  );
}
