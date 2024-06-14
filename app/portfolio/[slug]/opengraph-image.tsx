import { ImageResponse } from 'next/og';
import { Portfolio } from "@/config/portfolio";

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Portfolio Item';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Helper function to get absolute URL
const getAbsoluteUrl = (path: string) => {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }
  return new URL(path, process.env.NEXT_PUBLIC_BASE_URL).toString();
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  // Find the portfolio item based on the slug
  const item = Portfolio.find((p) => p.slug === params.slug);

  if (!item) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Not Found
      </div>,
      {
        ...size,
      }
    );
  }

  const imageUrl = getAbsoluteUrl(item.logo.src);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex', // Ensure display flex is set
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <img src={imageUrl} alt={item.title} width="100" height="100" />
        <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{item.title}</div>
          <div style={{ fontSize: '24px', marginTop: '10px' }}>{item.description}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
