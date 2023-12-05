import Nav from "./Nav"

export default function Header() {
  return (
    <header className="w-full bg-slate-200 h-8 flex-1 justify-between">
      <p>logo</p>
      <Nav/>
      <p>contact</p>
    </header>
  );
}
