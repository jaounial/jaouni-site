import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ali Jaouni — Industrial Engineer & AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Yellow accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "#f5c518" }} />

        {/* Tag */}
        <div style={{ display: "flex", marginBottom: "24px" }}>
          <span style={{ background: "#f5c51820", border: "1px solid #f5c51840", color: "#f5c518", fontSize: "14px", padding: "6px 14px", borderRadius: "99px", letterSpacing: "0.1em" }}>
            PORTFOLIO
          </span>
        </div>

        {/* Name */}
        <div style={{ color: "#e8e8e8", fontSize: "80px", fontWeight: 900, lineHeight: 1, marginBottom: "20px", letterSpacing: "-2px" }}>
          Ali Jaouni
        </div>

        {/* Subtitle */}
        <div style={{ color: "#f5c518", fontSize: "26px", marginBottom: "32px" }}>
          {">"} Industrial Engineer · AI Builder · UofT
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Python", "Machine Learning", "Automation", "FastAPI", "n8n"].map((tag) => (
            <span key={tag} style={{ background: "#141414", border: "1px solid #2a2a2a", color: "#888", fontSize: "14px", padding: "6px 14px", borderRadius: "6px" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{ position: "absolute", bottom: "40px", right: "80px", color: "#333", fontSize: "14px" }}>
          jaouni-site.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
