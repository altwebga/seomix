export function Experience() {
  return (
    <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
      <div>
        <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          200+
        </div>
        <div className="text-sm text-muted-foreground mt-1">Проектов</div>
      </div>
      <div>
        <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          12+
        </div>
        <div className="text-sm text-muted-foreground mt-1">Лет опыта</div>
      </div>
      <div>
        <div className="text-4xl font-bold bg-linear-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
          98%
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Довольных клиентов
        </div>
      </div>
    </div>
  );
}
