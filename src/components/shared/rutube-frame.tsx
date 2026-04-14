type RuTubeFrameProps = {
  videoId: string;
  title: string;
};

export function RuTubeFrame({ videoId, title }: RuTubeFrameProps) {
  return (
    <iframe
      allowFullScreen
      allow="clipboard-write; autoplay"
      className="w-full aspect-video"
      src={`https://rutube.ru/play/embed/${videoId}`}
      title={title}
    />
  );
}
