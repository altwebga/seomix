interface TwoColumnsProps {
  contentLeft: React.ReactNode;
  contentRight: React.ReactNode;
}
export function TwoColumns({ contentLeft, contentRight }: TwoColumnsProps) {
  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:w-2/3">{contentLeft}</div>
      <div className="md:w-1/3">{contentRight}</div>
    </div>
  );
}
