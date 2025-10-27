export interface StagePhase {
  step: number;
  title: string;
  content: string;
}

export interface Stage {
  phase: StagePhase[];
}
