import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";
import { redirect } from "next/navigation";
import { getUserFromClerkID } from "./auth";

export const createNewUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("No authenticated user found");
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress as string,
      },
    });
  }
  redirect("/journal");
};

export const getEntries = async () => {
  const user = await getUserFromClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });

  return entries;
};

export const getEntry = async (id: string) => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

export const getAnalyses = async () => {
  const user = await getUserFromClerkID();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
  const average = Math.round(sum / analyses.length);

  return { analyses, average };
};
