# 🎓 AI Tutor App

![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)
![Node](https://img.shields.io/badge/node-18%2B-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)

An intelligent, AI-powered educational platform designed to provide personalized mentorship, automated evaluation, and interactive learning experiences. This application leverages Large Language Models (LLMs) to bridge the gap between students and educators.

---

## 🚀 Features

* **Interactive AI Avatar:** Real-time conversational learning via a Speech-to-Text (STT) and Text-to-Speech (TTS) enabled AI mentor.
* **Automated Essay Grading:** AI-driven evaluation of long-form writing with detailed feedback on grammar, structure, and tone.
* **Instant Question Answering:** A "Textual Interaction" layer that provides asynchronous, context-aware answers to student queries.
* **Professor Dashboard:** A comprehensive interface for educators to monitor student progress, review evaluation history, and configure AI parameters.
* **Semantic Search:** Powered by a Vector Database (Azure AI Search) to retrieve relevant course material and historical context.

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend & AI
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)

---

## 📐 Architecture

The app is built using a modular, microservices-inspired architecture:



* **Frontend:** Built with **React / Next.js** (located in `src/frontend`).
* **Backend Engines:** Modular **FastAPI** services for:
    * `avatar`: Handles speech and visual interaction.
    * `essays`: Processes and evaluates student essays.
    * `questions`: Manages Q&A and knowledge retrieval.
    * `configuration`: Allows professors to tune the AI's behavior.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* **Python 3.10+**
* **Node.js 18+**
* **Poetry** (Python dependency management)

---

## 🔧 Installation & Setup

### 1. Clone the Repository

### 1. Clone the Repository
```bash
git clone [https://github.com/ArulSrivastva-AVV/AI-TUTOR-APP.git](https://github.com/ArulSrivastva-AVV/AI-TUTOR-APP.git)
cd AI-TUTOR-APP
```

### 2. Backend Setup
```bash
cd src/<service_name>
poetry install
poetry run uvicorn app.main:app --reload
```
### 3. Frontend Setup
```bash
cd src/frontend
npm install
npm run dev
```
Open http://localhost:3000 to view the app.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
   Click the `Fork` button at the top right of this page to create a copy of the repository in your own GitHub account.

2. **Clone your Fork**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
   ```
3. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

### Contribution Guidelines
Code Style: Please ensure your code follows the project's existing linting and formatting rules.

Testing: If applicable, add tests for your new features to ensure stability.

Documentation: Update the README or inline comments if your changes introduce new logic or workflows.   
