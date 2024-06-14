import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { Portfolio } from '@/config/portfolio';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  const item = Portfolio.find((p) => p.slug === slug);

  if (!item) {
    return notFound();
  }

  // Абсолютный URL для источника изображения
  const imageUrl = new URL(item.logo.src, process.env.NEXT_PUBLIC_BASE_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <img src={imageUrl} alt={item.title} style={{ width: 100, height: 100, borderRadius: '50%' }} />
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
