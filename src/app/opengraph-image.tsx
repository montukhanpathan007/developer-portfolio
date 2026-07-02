import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0c0a09",
          color: "#e7e5e4",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span style={{ color: "#a8a29e" }}>POST /graphql</span>
          <span style={{ color: "#2dd4bf", display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#2dd4bf",
                display: "flex",
              }}
            />
            200 OK
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 72, fontWeight: 700, color: "#fafaf9", letterSpacing: -2 }}>
            {siteConfig.name}
          </span>
          <span style={{ fontSize: 34, color: "#2dd4bf", marginTop: 18 }}>
            Backend Developer — Magento 2 · Laravel · PHP
          </span>
          <span style={{ fontSize: 26, color: "#a8a29e", marginTop: 18 }}>
            B2B e-commerce · GraphQL & REST APIs · ERP integrations
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#57534e",
          }}
        >
          <span>github.com/Montukhan786</span>
          <span>Ahmedabad, IN</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
