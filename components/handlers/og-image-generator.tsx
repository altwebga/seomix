import { ImageResponse } from "next/og";

interface OGImageProps {
  title: string;
  description: string;
}

export function generateOGImage({ title, description }: OGImageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%), url(${baseUrl}/images/og_template.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Overlay для лучшей читаемости текста */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.3)",
          }}
        />

        {/* Контент */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          {/* Заголовок */}
          <h1
            style={{
              fontSize: title.length > 50 ? "48px" : "64px",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 30px 0",
              lineHeight: 1.2,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              wordWrap: "break-word",
            }}
          >
            {title}
          </h1>

          {/* Описание */}
          <p
            style={{
              fontSize: "32px",
              color: "rgba(255, 255, 255, 0.9)",
              margin: "0",
              lineHeight: 1.4,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
              wordWrap: "break-word",
              maxWidth: "800px",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
