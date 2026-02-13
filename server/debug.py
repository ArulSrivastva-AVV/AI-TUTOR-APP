import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env")

client = genai.Client(api_key=api_key)

print("\n🔍 Listing available models:\n")

try:
    for model in client.models.list():
        print(f"Name: {model.name}")
        print(f"  Supported methods: {getattr(model, 'supported_generation_methods', 'N/A')}")
        print("-" * 50)

except Exception as e:
    print("❌ Error listing models:")
    print(e)
