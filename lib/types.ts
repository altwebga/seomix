export interface IBaseContent {
  id: number
  status: "published" | "draft" | "archived"
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
}

export interface IService extends IBaseContent {
  title: string
  slug: string
  description: string
  excerpt: string
  price: number | null
  time: string | number | null
  cover_image: string
  seo: ISeo | null
}

export interface ISeo {
  title: string
  meta_description: string
  focus_keyphrase: string
  og_image: string | null
  sitemap?: {
    priority: string
    change_frequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never"
  }
}

export interface IPost extends IBaseContent {
  title: string
  description: string
  excerpt: string
  cover_image: string
  tags: string[]
  slug: string
  seo: ISeo
  category: IBlogCategories[]
}

export interface IBlogCategories {
  id: number
  blog_id?: IPost
  categories_id?: ICategory[]
}

export interface ICategory {
  id: number
  title: string
  description?: string
}

export interface IProject extends IBaseContent {
  title: string
  slug: string
  description: string

  excerpt: string | null

  // ⚠️ поле с опечаткой в API
  coner_image: string

  seo: ISeo

  client: number // ID связи (likely relation)
  release_date: string // ISO date (YYYY-MM-DD)

  RuTube_video: string | null
  video: string | null

  site_url: string | null
}

export interface IClient extends IBaseContent {
  title: string
  type_company: string
  logo: string
}

export interface ITeam extends IBaseContent {
  first_name: string
  last_name: string | null
  position: string
  photo: string
  bio: string
  education: EducationItem[]
}

export interface EducationItem {
  id: number
  team_id: number
  directus_files_id: string
}

export interface IRequest {
  name: string
  phone: string
  url: string
  message?: string
}

export interface ILegalInformation {
  title: string
  status: "published" | "draft" | "archived"
  description: string
}

export interface IRegionHero extends IBaseContent {
  city: string
  in_city: string
  from_city: string
  description: string
  seo: ISeo
}
