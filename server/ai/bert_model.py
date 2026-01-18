import requests
import os

API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment"
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN is not set. Please set environment variable.")

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

LABEL_MAP = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}

def predict_sentiment(text):
    response = requests.post(
        API_URL,
        headers=HEADERS,
        json={"inputs": text},
        timeout=10
    )

    data = response.json()

    # Handle API errors safely
    if isinstance(data, dict) and "error" in data:
        return {
            "label": "Neutral",
            "confidence": 0.0
        }

    predictions = data[0]
    best = max(predictions, key=lambda x: x["score"])

    # Normalize labels from HF model
    label_map = {
        "LABEL_0": "Negative",
        "LABEL_1": "Neutral",
        "LABEL_2": "Positive",
        "negative": "Negative",
        "neutral": "Neutral",
        "positive": "Positive"
    }

    label = label_map.get(best["label"], "Neutral")

    return {
        "label": label,
        "confidence": round(best["score"], 4)
    }

