export function Footer() {
  return (
    <footer className="mt-4 w-full border-t border-t-primary/20 bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div>
          <p>All rights reserved © {new Date().getFullYear()}</p>
          <div></div>
        </div>
      </div>
    </footer>
  )
}
