/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'upload.wikimedia.org',
      'uhdtv.io',
      'mango.blender.org',
      'download.blender.org',
    ],
  },
  env: { NEXTAUTH_URL: 'https://netflix.iran.liara.run' },
}

module.exports = nextConfig
