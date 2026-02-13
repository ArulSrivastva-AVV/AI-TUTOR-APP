import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# LangChain / AI Imports
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_classic.chains import RetrievalQA

# 1. Load Environment Variables (API Keys)
load_dotenv()

app = Flask(__name__)
CORS(app) # This allows your React app to talk to this server

# 2. Setup AI Models
# Make sure you have GOOGLE_API_KEY in your .env file
embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

# 3. Load the Knowledge Base (ChromaDB)
# This assumes you have already run an ingestion script to create the 'vector_db'
persist_directory = "../data/vector_db"

# We initialize the vector store
vector_db = Chroma(
    persist_directory=persist_directory, 
    embedding_function=embeddings
)

# 4. Create the RAG Chain
# This 'chain' handles the searching and answering automatically
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_db.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True
)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    user_query = data.get('question')

    if not user_query:
        return jsonify({"error": "No question provided"}), 400

    try:
        # Run the RAG pipeline
        result = rag_chain.invoke({"query": user_query})
        
        # 'result' contains the answer and the documents used to find it
        response = {
            "answer": result["result"],
            "sources": [doc.metadata.get('source', 'Unknown') for doc in result["source_documents"]]
        }
        return jsonify(response)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "The AI Tutor is having trouble thinking. Check your API key."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)