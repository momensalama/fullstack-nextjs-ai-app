"use client";

import { useFormStatus } from "react-dom";
interface CreateEntryBtnProps {
  pendingLabel: string;
  label: string;
}

export default function CreateEntryBtn({
  pendingLabel,
  label,
}: CreateEntryBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="text-3xl cursor-pointer px-4 py-5 sm:p-6 w-full"
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
