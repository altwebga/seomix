export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="inline-block max-w-lg text-center justify-center">
        {children}
      </main>
    </>
  );
}
