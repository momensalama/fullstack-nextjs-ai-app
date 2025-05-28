import Editor from "@/app/components/Editor";
import { getEntry } from "../../../../utils/prismaQueries";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const entry = await getEntry(params.id);

  return {
    title: `Entry ${entry?.id?.slice(0, 8)}`,
    description: entry?.analysis?.summary,
  };
}

const JournalEditorPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const entry = await getEntry(params.id);

  // Serialize the entry data
  const serializedEntry = {
    ...entry,
    createdAt: entry?.createdAt.toISOString(),
    updatedAt: entry?.updatedAt.toISOString(),
    analysis: entry?.analysis
      ? {
          ...entry.analysis,
          createdAt: entry.analysis.createdAt.toISOString(),
          updatedAt: entry.analysis.updatedAt.toISOString(),
        }
      : null,
  };

  return <Editor entry={serializedEntry} />;
};

export default JournalEditorPage;
