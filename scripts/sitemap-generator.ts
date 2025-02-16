import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { join } from 'path'

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/ai', changefreq: 'weekly', priority: 0.8 },
  { url: '/tech', changefreq: 'weekly', priority: 0.8 },
  { url: '/portfolio', changefreq: 'weekly', priority: 0.8 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.5 }
]

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://swtlabs.pl' })
  const writeStream = createWriteStream(join(process.cwd(), 'public', 'sitemap.xml'))
  
  sitemap.pipe(writeStream)
  routes.forEach(route => sitemap.write(route))
  sitemap.end()
  
  await streamToPromise(sitemap)
  console.log('Sitemap generated at public/sitemap.xml')
}

generateSitemap() 