import HistoryChart from "@/app/components/HistoryChart";
import { getAnalyses } from "../../../utils/prismaQueries";

export const metadata = {
  title: "History",
};

async function page() {
  const { analyses, average } = await getAnalyses();
  return (
    <div className="h-[100dvh] px-6 py-8">
      <h2 className="text-2xl mb-4">{`Avg. Sentiment: ${average || 0}`}</h2>
      <HistoryChart data={analyses} />
    </div>
  );
}

export default page;
