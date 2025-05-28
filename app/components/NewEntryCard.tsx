"use client";
import { createNewEntry } from "@/utils/actions";
import { useRouter } from "next/navigation";
import CreateEntryBtn from "./CreateEntryBtn";

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };
  return (
    <form
      action={handleOnClick}
      className=" flex justify-center rounded-lg bg-white shadow "
    >
      <CreateEntryBtn pendingLabel="creating..." label="New Entry" />
    </form>
  );
};

export default NewEntryCard;
