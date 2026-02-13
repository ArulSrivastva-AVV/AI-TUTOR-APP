import os
import time
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. Configuration
load_dotenv()
DATA_PATH = "../data/textbooks"        # Folder containing your PDFs
DB_PATH = "../data/vector_db"          # Folder where ChromaDB will be saved

# 2. Initialize Embeddings
# Using the stable model for your API version
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

def run_ingestion():
    # Check if textbooks folder exists
    if not os.path.exists(DATA_PATH):
        print(f"❌ Error: Folder {DATA_PATH} not found.")
        return

    all_docs = []
    
    # 3. Load all PDFs from the data folder
    print(f"📂 Scanning for PDFs in {DATA_PATH}...")
    for file in os.listdir(DATA_PATH):
        if file.endswith(".pdf"):
            print(f"📄 Loading: {file}...")
            loader = PyPDFLoader(os.path.join(DATA_PATH, file))
            all_docs.extend(loader.load())

    if not all_docs:
        print("⚠️ No PDF files found to process.")
        return

    # 4. Split Text into Chunks
    # Recursive splitter keeps semantic context together
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=["\n\n", "\n", ".", " ", ""]
    )
    chunks = text_splitter.split_documents(all_docs)
    total_chunks = len(chunks)
    print(f"🔹 Created {total_chunks} text chunks.")

    # 5. Batch Processing with Rate Limiting
    # We process in batches of 50 to stay under the 100 requests/min limit
    batch_size = 50
    print(f"🚀 Starting embedding process in batches of {batch_size}...")
    
    # We initialize the vector store with the first batch
    vector_db = Chroma.from_documents(
        documents=chunks[:batch_size],
        embedding=embeddings_model,
        persist_directory=DB_PATH
    )
    
    print(f"✅ Batch 1/{math.ceil(total_chunks/batch_size)} indexed.")
    
    # Process remaining batches with a "cooldown"
    for i in range(batch_size, total_chunks, batch_size):
        batch = chunks[i : i + batch_size]
        
        # Add delay to prevent '429 Resource Exhausted' error
        print(f"⏳ Cooling down for 10 seconds to respect API quota...")
        time.sleep(10) 
        
        vector_db.add_documents(batch)
        print(f"✅ Batch {(i // batch_size) + 1}/{math.ceil(total_chunks/batch_size)} indexed.")

    print(f"\n✨ Success! Knowledge base fully saved to {DB_PATH}")

if __name__ == "__main__":
    import math
    run_ingestion()