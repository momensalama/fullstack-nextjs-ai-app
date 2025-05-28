"use client";
import { askQuestion } from "@/utils/actions";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    const data = await askQuestion(question);

    setAnswer(data);
    setLoading(false);
    setQuestion("");
  };
  return (
    <div className="my-3">
      <form className="flex items-center flex-wrap gap-4 w-full ">
        <label htmlFor="question" className="w-full md:w-1/3">
          <input
            type="text"
            value={question}
            name="question"
            id="question"
            placeholder="Ask a question..."
            inputMode="text"
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
            className="border border-gray-300 w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#1a69c6] text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          Ask
        </button>
      </form>

      {loading ? (
        <div className="my-3">
          <SpinnerMini />
        </div>
      ) : null}
      {answer ? (
        <p className="text-lg bg-gray-200 p-4 rounded-md my-4">{answer}</p>
      ) : null}
    </div>
  );
};

export default Question;
