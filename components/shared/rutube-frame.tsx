type RuTubeFrameProps = {
  videoId: string
  title: string
}

export function RuTubeFrame({ videoId, title }: RuTubeFrameProps) {
  return (
    <iframe
      allowFullScreen
      allow="clipboard-write; autoplay"
      className="aspect-video w-full"
      src={`https://rutube.ru/play/embed/${videoId}`}
      title={title}
    />
  )
}
