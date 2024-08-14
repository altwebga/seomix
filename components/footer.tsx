import { SocialLink } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-4 py-4 md:py-10">
        <SocialLink color="foreground" size="medium" />
        <p>© 2022 SeoMix. All rights reserved.</p>
      </div>
    </footer>
  );
}
