# Campus Assistant Frontend

This directory contains the React frontend for the Campus Assistant Chatbot project, built using Vite.

## Features

- React 18 with functional components and hooks
- Chat interface for interacting with the backend chatbot API
- Additional UI components for canteen menu, department locations, and quick actions
- Built with Vite for fast development and optimized builds

## Setup and Development

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

This will start the frontend development server at http://localhost:3000.

## Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` folder.

## Linting

ESLint is configured for this project. To run linting:

```bash
npm run lint
```

## Notes

- This frontend communicates with the backend API running at http://localhost:5000.
- Ensure the backend server is running before starting the frontend to enable full functionality.
