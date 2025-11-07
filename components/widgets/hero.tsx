import { BackgroundBeams } from "../ui/background-beams";
export function Hero() {
  return (
    <div className="h-screen">
      <div className="container mx-auto p-4">
        <h1>Background Beams</h1>
        <p>
          Welcome to the background beams component. This is a simple example of
          how to use the BackgroundBeams component. Have fun building your next
          project.
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
