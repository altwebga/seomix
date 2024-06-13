import { MetadataRoute } from 'next'
import { Services } from '@/config/services'
import { Portfolio } from '@/config/portfolio'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL
  if (!baseUrl) {
    throw new Error('SITE_URL is not defined in the environment variables')
  }

  // Главная страница
  const mainPage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily',
    priority: 1.0,
  }

  // Статические страницы
  const sitePages = siteConfig.navItems.map(page => ({
    url: `${baseUrl}/${page.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.8,
  }))

  // Динамические страницы услуг
  const dynamicServicePages = Services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }))

  // Динамические страницы портфолио
  const dynamicPortfolioPages = Portfolio.map(item => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }))

  return [mainPage, ...sitePages, ...dynamicServicePages, ...dynamicPortfolioPages]
}
