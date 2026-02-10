import { Markdown } from "@/components/shared/markdown";
import { IPrivacyPolicy } from "@/config/types";
import { SectionContainer } from "@/components/containers/section-container";

const TOKEN = process.env.TOKEN;
const API_URL = process.env.API_URL;

export default async function PrivacyPolicy() {
  const data = await fetch(`${API_URL}/items/privacy_policy`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const privacy_policy = (await data.json()) as IPrivacyPolicy;
  return (
    <SectionContainer>
      <h1>{privacy_policy.data.title}</h1>
      <Markdown markdown={privacy_policy.data.description} className="mb-20" />
    </SectionContainer>
  );
}
