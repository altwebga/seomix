type FeaturedProps = {
  featuredTitle: string;
  featuredDescription: string;
};

export function Featured({
  featuredTitle,
  featuredDescription,
}: FeaturedProps) {
  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold">{featuredTitle}</h2>
        <div
          className="text-gray-500"
          dangerouslySetInnerHTML={{ __html: featuredDescription }}
        />
      </div>
    </section>
  );
}
