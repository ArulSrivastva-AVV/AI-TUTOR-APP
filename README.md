AI Tutor App 🎓
An intelligent, AI-powered educational platform designed to provide personalized mentorship, automated evaluation, and interactive learning experiences. This application leverages Large Language Models (LLMs) to bridge the gap between students and educators.

🚀 Features
Interactive AI Avatar: Real-time conversational learning via a Speech-to-Text and Text-to-Speech enabled AI mentor.

Automated Essay Grading: AI-driven evaluation of long-form writing with detailed feedback on grammar, structure, and tone.

Instant Question Answering: A "Textual Interaction" layer that provides asynchronous, context-aware answers to student queries.

Professor Dashboard: A comprehensive interface for educators to monitor student progress, review evaluation history, and configure AI parameters.

Semantic Search: Powered by a Vector Database (Azure AI Search) to retrieve relevant course material and historical context.

🛠️ Architecture
The app is built using a microservices-inspired architecture:

Frontend: React / Next.js (located in src/frontend)

Backend Engines: Modular FastAPI services for:

avatar: Handles speech and visual interaction.

essays: Processes and evaluates student essays.

questions: Manages Q&A and knowledge retrieval.

configuration: Allows professors to tune the AI's behavior.

Infrastructure: Infrastructure as Code (Bicep) for seamless deployment to Azure.

📋 Prerequisites
Before you begin, ensure you have the following installed:

Python 3.10+

Node.js 18+

Poetry (Python dependency management)


🔧 Installation & Setup
1. Clone the Repository
Bash
```
git clone https://github.com/ArulSrivastva-AVV/AI-TUTOR-APP.git
cd AI-TUTOR-APP
```
2. Backend Setup
 bash
 ```
Navigate to each service in src/ (e.g., src/essays) and install dependencies:
```
Bash
```
cd src/<service_name>
poetry install
poetry run uvicorn app.main:app --reload
```

3. Frontend Setup
Bash
cd src/frontend
npm install
npm run dev
Open http://localhost:3000 to view the app.
to install dependencies:
run 
bash
```
pip install -r requirements.txt
```


🤝 Contributing
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
Distributed under the MIT License. See LICENSE for more information.
