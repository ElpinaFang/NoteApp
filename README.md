# 📝 NoteApp
A simple note-taking web app built with HTML, CSS, and JavaScript, powered by a Node.js/Express backend. You can create, view, and delete notes in real time.

## 🌐 Features
- Add new notes with a title, content, and tags
- View all saved notes
- Delete unwanted notes
- Responsive layout with a clean dark mode UI
- Backend API using Express.js (local or cloud-hosted)
- MongoDB or in-memory array support for storing notes

## 🚀 Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express.js
- Database:
  - Local version: In-memory array
  - Cloud version: MongoDB (via MongoDB Atlas)
- Deployment: Railway / Render (optional)

## 📦 How to Run Locally
1. Clone the repository
git clone https://github.com/yourusername/noteapp.git
cd noteapp
2. Install dependencies
npm install
3. Set up environment variables (if using MongoDB)
Create a .env file:
MONGO_URI=your-mongodb-connection-string
4. Start the server
node server.js

Then open http://localhost:3000 in your browser.

## ✨ Optional Features to Add
- Edit existing notes
- Search/filter notes
- User authentication (JWT)
- Save to localStorage when offline
- Light/dark mode toggle
