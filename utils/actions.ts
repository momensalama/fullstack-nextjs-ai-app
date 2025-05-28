"use server";

import { revalidatePath } from "next/cache";
import { getUserFromClerkID } from "./auth";
import { prisma } from "./db";
import { analyzeEntry, qa } from "./ai";

export const createNewEntry = async () => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      content: "Write about Your day!",
      userId: user.id,
    },
  });

  const analysis = await analyzeEntry(entry.content);

  if (!analysis) return entry;

  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath("/app/journal");

  return entry;
};

export const updateEntry = async (entryId: string, content: string) => {
  const user = await getUserFromClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: entryId,
      },
    },
    data: {
      content,
    },
  });

  const entryAnalysis = await analyzeEntry(updatedEntry.content);

  await prisma.analysis.update({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      ...entryAnalysis,
    },
  });

  revalidatePath("/app/journal");

  return updatedEntry;
};

export const askQuestion = async (question: string) => {
  const user = await getUserFromClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);

  return answer;
};

export const deleteEntry = async (entryId: string) => {
  const user = await getUserFromClerkID();
  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: entryId,
      },
    },
  });

  revalidatePath("/app/journal");
};
