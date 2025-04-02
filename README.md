# Note-Taking Application

## Overview
This is a full-stack note-taking application that allows users to create, read, update, and delete notes. The application consists of a React.js front-end and a Node.js/Express.js back-end with a database for storing notes.

## Live URLs
- **Front-End:** [IDX Solana Assignment Frontend](https://idxsolana-assignment.vercel.app/)
- **Back-End:** [IDX Solana Assignment Backend](https://idxsolana-assignment-backend.onrender.com)

## Features
### Front-End (React.js)
1. **User Interface:**
   - View a list of all notes.
   - Create a new note.
   - Edit an existing note.
   - Delete a note.
2. **State Management:**
   - Uses React's `useState` or Context API to manage application state.
3. **API Integration:**
   - Connects to the back-end API to perform CRUD operations.

### Back-End (Node.js & Express.js)
1. **API Endpoints:**
   - `GET /notes` - Retrieve all notes.
   - `GET /notes/:id` - Retrieve all notes.
   - `POST /notes` - Create a new note.
   - `PUT /notes/:id` - Update an existing note.
   - `DELETE /notes/:id` - Delete a note.

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB (if using locally)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sanjeevk249116/Idxsolana-assignment.git
   cd your-repository
   ```
2. Install dependencies for the back-end:
   ```bash
   cd backend
   npm install
   ```
3. Start the back-end server:
   ```bash
   npm start
   ```
4. Install dependencies for the front-end:
   ```bash
   cd ../frontend
   npm install
   ```
5. Start the front-end:
   ```bash
   npm start
   ```
6. Open the application in your browser:
   ```
   http://localhost:3000
   ```



