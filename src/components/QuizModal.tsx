import React, { useState } from "react";
import { useQuizContext } from "../context/QuizContext";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  clearError: () => void;
}



const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  error,
  clearError,
}) => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const { createQuiz } = useQuizContext();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(quizName, quizDescription); 
    
    try {
       await createQuiz({
            title: quizName,
            description: quizDescription,

    });
    setQuizName('');
    setQuizDescription('');
    
    } catch (err) {
        console.error(err);
    } finally {
        // toggleModal();
    }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-1/3 p-10 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Quiz</h2>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 right-0 px-4 py-3"
              onClick={clearError}
            >
              <span className="sr-only">Close</span>
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Quiz Name</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizModal;
function createQuiz(arg0: { title: string; description: string; }) {
    throw new Error("Function not implemented.");
}

