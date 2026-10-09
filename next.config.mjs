import { withPayload } from '@payloadcms/next/withPayload'
export default withPayload({
  output: 'standalone',
  poweredByHeader: false,
  allowedDevOrigins: process.env.CODESPACE_NAME
    ? [process.env.CODESPACE_NAME + '-3000.' + (process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev')]
    : [],
  async headers() {
    return process.env.SITE_ENV === 'production' ? [] : [
      { source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] },
    ]
  },
})

