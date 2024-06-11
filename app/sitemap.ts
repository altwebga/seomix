import { MetadataRoute } from 'next'
import { Services } from '@/config/services'
import { Portfolio } from '@/config/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL 

  const dynamicServicePages = Services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }))

  const dynamicPortfolioPages = Portfolio.map(item => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }))

  return [ ...dynamicServicePages, ...dynamicPortfolioPages]
}
