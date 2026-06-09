import { ImageResponse } from 'next/og'
import { SITE_FULL_NAME, SITE_TAGLINE } from '../../lib/seo'

export const config = {
  runtime: 'edge',
}

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #060910 0%, #0d1520 55%, #1a1208 100%)',
          padding: '72px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #2f5d43, #c9a227, #9a3b2c)',
          }}
        />
        <div
          style={{
            fontSize: 22,
            color: '#c9a227',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {SITE_FULL_NAME}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            marginTop: 20,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#9ca3af',
            marginTop: 28,
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Report racial incidents · Map community patterns · Read policy analysis for Black America
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            color: '#60a5fa',
            fontWeight: 600,
          }}
        >
          aassociety.org
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
