import { Container } from "@/components/container/container";
import { TextAnimate } from "@/components/ui/text-animate";
import { getTeams } from "@/actions/get-content";
import { DirectusImage } from "@/components/shared/directus-image";
import { Markdown } from "@/components/shared/markdown";
const text = {
  title: "О нас",
  subTitle: "Наша команда",
};

export default async function AboutPage() {
  const teams = await getTeams();
  console.log(teams);
  return (
    <Container className="my-20">
      <h1>{text.title}</h1>
      <TextAnimate animation="blurIn" as="p">
        {text.subTitle}
      </TextAnimate>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="min-h-60 p-4 rounded-md">
            <DirectusImage
              url={team.photo}
              width={320}
              height={320}
              className="object-cover w-80 h-80 bg-white rounded-2xl"
            />

            <div>
              <h2 className="mt-4">{team.title}</h2>
              <Markdown
                markdown={team.content || ""}
                className="text-muted-foreground"
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
