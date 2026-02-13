import axios from 'axios';

// Base configuration for your Flask Backend
const API = axios.create({
  baseURL: 'http://localhost:5000', // The address where your Python server runs
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  // Sends the student's question to the RAG pipeline
  askQuestion: async (question: string) => {
    const response = await API.post('/ask', { question });
    return response.data; // Should return { answer: "...", source: "..." }
  },

  // Uploads a new PDF to the tutor's knowledge base
  uploadSyllabus: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await API.post('/ingest', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};