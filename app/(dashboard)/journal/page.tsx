import Question from "@/app/components/Question";
import { getEntries } from "../../../utils/prismaQueries";
import NewEntryCard from "@/app/components/NewEntryCard";
import EntryCard from "@/app/components/EntryCard";
import { Entry } from "@/types";

export const metadata = {
  title: "Journal",
};

// Add dynamic configuration
export const dynamic = "force-dynamic";
export const revalidate = 0;

const JournalPage = async () => {
  try {
    const entries = await getEntries();

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Journal</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Question />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NewEntryCard />
          {entries.map((entry: Entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in JournalPage:", error);
    throw error;
  }
};

export default JournalPage;
