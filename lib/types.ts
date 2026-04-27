export interface IService {
  id: number
  status: "published" | "draft" | "archived"
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
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
}

export interface IPost {
  id: number
  status: "published" | "draft" | "archived" | string
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  title: string
  description: string
  excerpt: string
  cover_image: string
  tags: string[]
  slug: string
  seo: ISeo
}

export interface IProject {
  id: number
  status: "published" | "draft" | "archived" | string
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null

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

export interface IClient {
  id: number
  status: "published" | "draft" | "archived"
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  title: string
  type_company: string
  logo: string
}

export interface ITeam {
  id: number
  status: "published" | "draft" | "archived"
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
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
