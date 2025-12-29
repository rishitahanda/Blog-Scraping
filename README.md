BeyondChats Assignment

This project is built as part of the BeyondChats technical assignment.
It is a simple full-stack application that scrapes blog articles, improves them using AI with reference articles, and displays both versions on a frontend interface.

The main focus of this project is data flow, backend logic, and AI integration, and a sprinkle of UI design.

(I) Local Setup Instructions
    Prerequisites
    1. Node.js installed
    2. npm installed
    3. MongoDB Atlas account (or local MongoDB)
    
    Step 1: Clone the repository : 
        git clone <https://github.com/rishitahanda/Blog-Scraping>
        cd Blog-Scraping
        
    Step 2: Backend setup :
        MONGO_URI=<MONGO_URI>
        OPENAI_API_KEY=<OPENAI_API_KEY>
        SERPAPI_KEY=<SERPAPI_KEY>
    
        Install backend dependencies: npm install
        Install backend dependencies: node server.js
        Start the backend server: http://localhost:5000
    
    Step 3: Frontend setup :
        cd frontend
        npm install
        npm start
    
        Frontend will run on: http://localhost:3000

(II) Data Flow Diagram:
                             Frontend (React)
                                    |
                                    |  API Requests
                                    |
                              Backend (Node.js + Express)
                                    |
                                    |  Database Queries
                                    |
                              MongoDB (Articles Collection)
                                    |
                                    |  Phase 2 Script
                                    |
                              Google Search (SerpAPI) → External Blogs
                                    |
                                    |  Reference Content
                                    |
                              OpenAI API → Updated Article Content

(III) Frontend Link Live Demo:
[(https://blog-scraping-rosy.vercel.app/)](https://blog-scraping-rosy.vercel.app/)
