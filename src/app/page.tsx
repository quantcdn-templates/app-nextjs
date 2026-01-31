import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('host') || 'unknown';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000 0%, #111 100%)',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '48px',
          maxWidth: '600px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <h1 style={{ margin: '0 0 16px', fontSize: '2.5rem', color: '#000' }}>
          Next.js SSR on Quant Cloud
        </h1>
        <p style={{ margin: '0 0 24px', fontSize: '1.125rem', color: '#666' }}>
          Your server-rendered Next.js app is live! This page was rendered on
          the server with the App Router.
        </p>

        <div
          style={{
            background: '#f4f4f4',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
            <strong>Host:</strong> {host}
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '0.875rem', color: '#666' }}>
            <strong>Rendered at:</strong> {new Date().toISOString()}
          </p>
        </div>

        <h2 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#333' }}>
          Features
        </h2>
        <ul style={{ margin: '0 0 24px', paddingLeft: '20px', color: '#666' }}>
          <li>Server-Side Rendering with React Server Components</li>
          <li>App Router with layouts and nested routes</li>
          <li>API Routes via Route Handlers</li>
          <li>Automatic HTTPS and CDN caching</li>
          <li>Built-in proxy for correct Host headers</li>
        </ul>

        <h2 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#333' }}>
          API Example
        </h2>
        <p style={{ margin: '0', color: '#666' }}>
          Try the API endpoint:{' '}
          <a href="/api/hello" style={{ color: '#0070f3' }}>
            /api/hello
          </a>
        </p>
      </div>
    </main>
  );
}
