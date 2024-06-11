import CallToAction from "@/components/CallToAction";

export default function PortfolioItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-7xl px-4">
      {children}
      <div className="my-6">
        <CallToAction />
      </div>
    </div>
  );
}
