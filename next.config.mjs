

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "platform.rankcaster.ai" },
      { protocol: "https", hostname: "**.rankcaster.ai" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/feed.xml",
        headers: [{ key: "Content-Type", value: "application/rss+xml; charset=utf-8" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Content-Type", value: "application/xml" }],
      },
    ]
  },
}

export default nextConfig
