# Campus Assistant Chatbot - Complete Documentation

## Overview
The Campus Assistant Chatbot is a web-based application designed to assist users with queries related to campus facilities and services. It consists of a frontend (React with Vite) and a backend (Node.js with Express & Dialogflow) that powers the chatbot functionality. The chatbot processes user messages, interacts with Dialogflow for natural language understanding, and returns relevant responses. It also logs chat interactions to Firestore.

## Features
- AI-powered Chatbot: Uses Google Dialogflow for natural language understanding.
- Chat Logging: Saves chat logs to Firestore for analysis.
- User-friendly UI: Clean and interactive chat interface with additional campus-related features.
- Additional Features: Canteen menu display, department locations map, and quick action buttons.
- Responsive Design: Works smoothly on both mobile and desktop devices.

## Tech Stack

### Frontend
- React.js
- Vite (build tool)
- CSS (inline styles)

### Backend
- Node.js with Express
- Google Dialogflow API
- Firestore (Firebase) for chat logs
- Body-parser, CORS middleware

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/your-repo/campus-assistant-chatbot.git
cd campus-assistant-chatbot
```

### Backend Setup
```bash
cd bac
npm install
npm start
```
The backend server will run at http://localhost:5000.

### Frontend Setup
```bash
cd fro
npm install
npm run dev
```
The frontend will run at http://localhost:3000.

## Backend API Endpoints

### POST /chat
Send a user message to the chatbot and receive a reply.

**Request Body:**
```json
{
  "message": "Hello, how can I find the library?"
}
```

**Response:**
```json
{
  "reply": "The library is located in the main building, open from 8 AM to 8 PM."
}
```

### POST /search
Send a question to search documents (if applicable).

**Request Body:**
```json
{
  "question": "What are the bus schedules?"
}
```

**Response:**
```json
{
  // Search results object
}
```

## Frontend Usage

The frontend provides a chat interface where users can type messages and receive responses from the chatbot. Additional UI features include:

- Display of today's canteen menu.
- Department locations map toggle.
- Quick action buttons for common queries like library hours, bus schedule, events, and help.

## Deployment Guide

### Frontend Deployment
Build the frontend for production:
```bash
cd fro
npm run build
```
Deploy the contents of the `dist` folder using platforms like Vercel or Netlify.

### Backend Deployment
Deploy the backend using platforms like Render.com or Vercel. Ensure environment variables and CORS policies are configured for production.

## Future Enhancements
- Voice input for chatbot interaction.
- User authentication and chat history saving.
- Integration with more campus services.
- Smarter AI responses using advanced NLP models.

## Conclusion
The Campus Assistant Chatbot offers a streamlined way for campus users to get quick answers and access useful information through an interactive chat interface. It combines AI-powered backend services with a responsive frontend for an efficient user experience. 🚀
