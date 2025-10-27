export interface HeroImage {
  id: string;
  title: string;
}

export interface Hero {
  hero_title: string;
  hero_city: string;
  hero_content: string;
  hero_image: HeroImage;
}
