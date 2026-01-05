import { Container } from "@/components/container/container";
import { TextAnimate } from "@/components/ui/text-animate";
import { getTeams } from "@/actions/get-content";
import { DirectusImage } from "@/components/shared/directus-image";
import { Markdown } from "@/components/shared/markdown";
import { CertificatesGallery } from "@/components/shared/certificates-gallery";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LightRays } from "@/components/ui/light-rays";
const text = {
  title: "О нас",
  subTitle: "Наша команда",
};

export default async function AboutPage() {
  const teams = await getTeams();
  return (
    <Container className="my-20">
      <h1>{text.title}</h1>
      <TextAnimate animation="blurIn" as="p">
        {text.subTitle}
      </TextAnimate>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="flex flex-col md:flex-row gap-4">
              <DirectusImage
                url={team.photo}
                width={200}
                height={200}
                className="object-cover w-50 h-50 bg-white rounded-2xl"
              />
              <div>
                <h3>{team.title}</h3>
                <p>{team.position}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Markdown
                markdown={team.content || ""}
                className="text-muted-foreground text-sm"
              />
              {team.certificates && team.certificates.length > 0 && (
                <CertificatesGallery certificates={team.certificates} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <LightRays />
    </Container>
  );
}
