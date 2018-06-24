export interface CreateChallengeRequest {
  startDate: Date;
  endDate: Date;
  numberOfSteps: number;
  beneficiaryName: string;
  value: number;
}
