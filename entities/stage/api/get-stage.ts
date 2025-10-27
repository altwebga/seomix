import { getContent, FetchOptions } from "@/shared/api/graphql-client";

import type { Stage } from "@/entities/stage/model/types";

const GET_STAGE = `
  query GetStage {
    stage {
      phase
    }
  }
`;

interface StageResponse {
  stage: Stage;
}

export async function getStages(options?: FetchOptions) {
  return getContent<StageResponse>(GET_STAGE, {
    revalidate: 60 * 60 * 24,
    ...options,
    tags: ["stage", ...(options?.tags ?? [])],
  });
}
