"use client";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import SpinnerMini from "./SpinnerMini";
import { updateEntry } from "@/utils/actions";

const Editor = ({ entry }: any) => {
  const [text, setText] = useState(entry.content);
  const [currentEntry, setEntry] = useState(entry);
  const [isSaving, setIsSaving] = useState(false);

  const { mood, negative, subject, summary, color } = entry.analysis;

  const analysisData = [
    {
      name: "Mood",
      value: mood,
    },
    {
      name: "Subject",
      value: subject,
    },
    {
      name: "Negative",
      value: negative ? "Yes" : "No",
    },
  ];

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry.content) return;
      setIsSaving(true);

      const data = await updateEntry(entry.id, _text);

      setEntry(data);
      setIsSaving(false);
    },
  });

  return (
    <div className="h-[100dvh] flex flex-wrap md:flex-nowrap gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <SpinnerMini />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="w-full">
        <textarea
          value={text}
          name="content"
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8"
        />
      </div>
      <div className="border-l border-black/5 mt-4 md:mt-0 ">
        <div
          className="h-[100px] text-white p-8"
          style={{
            backgroundColor: color,
          }}
        >
          <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            <li className="py-4 px-8 ">
              <h3 className="text-xl font-semibold w-1/3">Summary</h3>
              <div className="text-xl">{summary}</div>
            </li>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="py-4 px-8 flex items-center justify-between"
              >
                <h3 className="text-xl font-semibold w-1/3 me-3">
                  {item.name}
                </h3>
                <div className="text-xl">{item.value}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
