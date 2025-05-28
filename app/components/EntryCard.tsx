"use client";
import { Entry } from "@/types";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { deleteEntry } from "@/utils/actions";

const EntryCard = ({ entry }: { entry: Entry }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const date = new Date(entry.createdAt).toDateString();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDelete = async () => {
    dialogRef.current?.showModal();
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await deleteEntry(entry.id);
    router.refresh();
    dialogRef.current?.close();
  };

  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex flex-col h-full">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <time>{date}</time>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
            aria-label="Delete entry"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 py-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{entry.analysis?.subject}</h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              {entry.analysis?.summary}
            </p>
          </div>

          <div className="mt-4">
            <Link
              href={`/journal/${entry.id}`}
              className="text-sm font-semibold text-[#1a69c6] hover:text-[#1a69c6] hover:underline"
            >
              View full entry
            </Link>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/50 p-0 rounded-lg shadow-lg max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Delete Entry</h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this entry? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dialogRef.current?.close()}
              className="px-4 py-2 cursor-pointer text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 font-medium transition-colors"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EntryCard;
