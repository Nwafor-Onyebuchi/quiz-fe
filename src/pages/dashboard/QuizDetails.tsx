import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

interface Question {
    id: number;
    _id: string;
    content: string;
    answers: { id: number; content: string }[];
}

interface Quiz {
    id: number;
    _id: string;
    name: string;
    questions: Question[];
}

const QuizDetails: React.FC = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await api.get(`/quizes/${id}`);
                setQuiz(response.data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizDetails();
    }, [id]);

    const handleAddQuestion = () => {
        // Logic to add a new question
    };

    const handleUpdateQuestion = (questionId: number) => {
        // Logic to update the question
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    if (!quiz) return <div>No quiz found.</div>;

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">{quiz.name}</h1>
            <h2 className="text-xl mb-2">Questions</h2>
            <button 
                onClick={handleAddQuestion} 
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Add Question
            </button>
            <ul className="space-y-4">
                {quiz.questions.map((question) => (
                    <li key={question._id} className="p-4 bg-white rounded-lg shadow">
                        <div className="font-medium">{question.content}</div>
                        <div className="mt-2">
                            {question.answers.map((answer:any) => (
                                <div key={answer._id} className="ml-4">{answer.content}</div>
                            ))}
                        </div>
                        <button 
                            onClick={() => handleUpdateQuestion(question.id)} 
                            className="mt-2 text-yellow-500 hover:underline"
                        >
                            Update Question
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizDetails; // Add default export
