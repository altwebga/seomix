import { getContent } from "@/actions/fetch-data";
import { GET_TEAM } from "@/config/queries";
import { ITeam } from "@/config/types";
import { TeamCard } from "@/components/card/team-card";
import { SectionContainer } from "@/components/layout/section-container";

export default async function AboutPage() {
  const res = await getContent<{ team: ITeam[] }>(GET_TEAM, {
    revalidate: 3600 * 24,
  });

  if (!res?.team) {
    return (
      <div className="container mx-auto p-4">
        <h1>О нас</h1>
        <p>Информация о команде недоступна.</p>
      </div>
    );
  }

  const teamData = res.team.slice().sort((a, b) => a.id.localeCompare(b.id));

  return (
    <SectionContainer>
      <div className="mb-12">
        <h1>О нас</h1>
        <p>
          SEOMIX — команда специалистов в области IT и digital-маркетинга.
          Основной фокус — системный подход к развитию бизнеса.
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
    </SectionContainer>
  );
}
