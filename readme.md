# Notes MERN App

## Overview

This is a Notes application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to create, edit, delete, and search notes. It features a user-friendly interface and utilizes JWT for authentication.

## Features

- Create new notes
- Edit existing notes
- Delete notes
- Search notes by title or content
- Tagging system for organizing notes
- Responsive design

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/notes-mern-app.git
   cd notes-mern-app
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:

   ```bash
   cd ../frontend/notes-app
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

   ```plaintext
   connectionString=mongodb://<username>:<password>@localhost:27017/notes
   ```

2. Replace `<username>` and `<password>` with your MongoDB credentials.

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend application:

   ```bash
   cd ../frontend/notes-app
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:8000` for the backend API and `http://localhost:5173` for the frontend.

## Usage

- Use the interface to create, edit, and delete notes.
- Utilize the search bar to find notes quickly.
- Tag your notes for better organization.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MERN Stack](https://www.mongodb.com/mern-stack)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
