export function PageHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1 className="text-4xl font-extrabold uppercase md:text-6xl">{title}</h1>
      <p>{description}</p>
    </div>
  )
}
