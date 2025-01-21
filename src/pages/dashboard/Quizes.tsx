import React, { useEffect, useState } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import QuizModal from '../../components/QuizModal';

const Quizes = () => {
    const { quizzes, loading, error, fetchQuizzes, clearError } = useQuizContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

   

    useEffect(() => {
        fetchQuizzes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Quizzes</h1>
            <button 
                onClick={toggleModal} 
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Quiz
            </button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz) => (
                        <tr key={quiz._id}>
                            <td className="py-2 text-sm px-4 border-b">{quiz.title}</td>
                            <td className="py-2 text-sm px-4 border-b">{quiz.description}</td>
                            <td className="py-2 px-4 border-b flex justify-center items-center">
                                <button className="text-blue-500 text-sm hover:underline">View</button>
                                <button className="text-yellow-500 text-sm hover:underline mx-2">Edit</button>
                                <button className="text-red-500 text-sm hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <QuizModal isOpen={isModalOpen} onClose={toggleModal}  error={error} clearError={clearError}/>
        </div>
    );
};

export default Quizes;

