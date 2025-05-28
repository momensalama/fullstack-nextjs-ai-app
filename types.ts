export interface Entry {
  analysis: Analysis | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content: string;
}

export type QaEntry = Pick<Entry, "id" | "content" | "createdAt">;

export interface Analysis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  userId: string;
  mood: string;
  subject: string;
  negative: boolean;
  summary: string;
  color: string;
  sentimentScore: number;
}
