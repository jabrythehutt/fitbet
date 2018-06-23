export interface CreateChallengeRequest {
  challengerEmail: string;
  beneficiaryAddress: string;
  startDate: Date;
  endDate: Date;
  numberOfSteps: number;
}
