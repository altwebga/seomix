export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center p-4 bg-background text-muted-foreground border-t">
      <div className="text-sm">©2012-{year} seomix. Все права защищены.</div>
    </footer>
  );
}
