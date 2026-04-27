export function PageHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </div>
  )
}
