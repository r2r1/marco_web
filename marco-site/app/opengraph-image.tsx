import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MARCO — Эксперты в доходной недвижимости';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#131b18',
          fontFamily: 'serif',
        }}
      >
        {/* Subtle gradient accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(212,196,168,0.08) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 300,
              letterSpacing: '0.25em',
              color: '#F5F5F5',
              lineHeight: 1,
            }}
          >
            MARCO
          </span>
          <span
            style={{
              fontSize: 16,
              letterSpacing: '0.3em',
              color: '#D4C4A8',
              textTransform: 'uppercase',
              marginTop: 16,
            }}
          >
            Эксперты в доходной недвижимости
          </span>
        </div>

        {/* Bottom domain */}
        <span
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 14,
            letterSpacing: '0.2em',
            color: '#6B7270',
            textTransform: 'uppercase',
          }}
        >
          marco-kmv.ru
        </span>
      </div>
    ),
    { ...size },
  );
}
