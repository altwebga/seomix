type ServicesProps = {
  servicesTitle: string;
  servicesDescription: string;
};

export function Services({
  servicesTitle,
  servicesDescription,
}: ServicesProps) {
  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold">{servicesTitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: servicesDescription }} />
      </div>
    </section>
  );
}
