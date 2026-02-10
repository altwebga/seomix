export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        <p className="text-muted-foreground text-xs">
          ©SEOMIX 2012-{year}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
