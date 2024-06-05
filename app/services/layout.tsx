import BackgroundImage from '@/public/images/service_bg_1.png';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: 'cover', // This scales the background image to cover the entire element while maintaining its aspect ratio
          backgroundPosition: 'center', // This centers the background image
          backgroundAttachment: 'fixed', // This makes the background image fixed
          opacity: 0.2,
          zIndex: -1, // Ensure the background is behind other elements
        }}
      ></div>
      <div className="relative z-10 container mx-auto max-w-7xl px-4">{children}</div>
    </div>
  );
}
