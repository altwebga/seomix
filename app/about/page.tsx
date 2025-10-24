import { getContent } from "@/actions/fetch-data";
import { GET_TEAM } from "@/config/queries";
import { ITeam } from "@/config/types";
import { TeamCard } from "@/components/card/team-card";

export default async function AboutPage() {
  const res = await getContent<{ team: ITeam[] }>(GET_TEAM, {
    revalidate: 3600 * 24,
  });

  if (!res?.team) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">О команде</h1>
        <p className="text-muted-foreground">
          Информация о команде недоступна.
        </p>
      </div>
    );
  }

  const teamData = res.team.slice().sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">О команде</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Познакомьтесь с нашими экспертами, которые помогут вам достичь успеха
          в цифровом мире.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamData.map((member) => (
          <TeamCard
            key={member.id}
            title={member.title}
            position={member.position}
            content={member.content}
            photo={member.photo.id}
            certificates={member.certificates?.map(
              (cert) => cert.directus_files_id.id
            )}
          />
        ))}
      </div>
    </div>
  );
}
