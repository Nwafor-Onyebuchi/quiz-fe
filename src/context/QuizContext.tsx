import React, { createContext, useContext, useEffect, useState, ReactNode, Key } from 'react';
import api from '../services/api';
import { AxiosError } from 'axios';

interface Quiz {
    _id?: Key | null | undefined;
    title: ReactNode;
    description: string;
}

interface QuizContextType {
    quizzes: Quiz[];
    loading: boolean;
    error: string | null;
    fetchQuizzes: () => Promise<void>;
    createQuiz: (quiz: Quiz) => Promise<void>;
    clearError: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = async () => {
        try {
            const response = await api.get('/quizes');
            setQuizzes(response.data.data);
            return response.data;
        } catch (err) {
            setError(err instanceof AxiosError ? err.response?.data.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const createQuiz = async (quiz: Quiz) => {
        try {
            const response = await api.post('/quizes', quiz, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }   );
            setQuizzes([...quizzes, response.data.data]);
        } catch (err) {
            setError(err instanceof AxiosError ? err.response?.data.message : 'An error occurred');
        }
    };

    return (
        <QuizContext.Provider value={{ quizzes, loading, error, clearError, fetchQuizzes, createQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
};
