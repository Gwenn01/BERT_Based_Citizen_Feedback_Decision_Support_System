import requests
import os

API_URL = "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-xlm-roberta-base-sentiment"
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN is not set. Please set environment variable.")

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

LABEL_MAP = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive",
    "negative": "Negative",
    "neutral": "Neutral",
    "positive": "Positive"
}

NEGATIVE_KEYWORDS = [
    "rude", "slow", "annoying", "bad", "terrible",
    "worst", "poor", "angry", "delay", "unacceptable"
]

POSITIVE_KEYWORDS = [
    "excellent", "fast", "good", "great",
    "kind", "amazing", "satisfied", "happy"
]

def predict_sentiment(text):
    try:
        response = requests.post(
            API_URL,
            headers=HEADERS,
            json={"inputs": text},
            timeout=60
        )
    except requests.exceptions.RequestException:
        return {"label": "Neutral", "confidence": 0.0}

    # Hugging Face token / auth error debug ONLY
    if response.status_code == 401:
        print("HF AUTH ERROR: Token expired or invalid")
        return {"label": "Neutral", "confidence": 0.0}

    try:
        data = response.json()
    except Exception:
        return {"label": "Neutral", "confidence": 0.0}

    # Hugging Face API error (model loading, rate limit, etc.)
    if isinstance(data, dict) and "error" in data:
        if "token" in data["error"].lower() or "authorization" in data["error"].lower():
            print("HF AUTH ERROR:", data["error"])
        return {"label": "Neutral", "confidence": 0.0}

    predictions = data[0]

    scores = {}
    for p in predictions:
        raw_label = p["label"]
        normalized_label = LABEL_MAP.get(raw_label.lower(), LABEL_MAP.get(raw_label))
        if normalized_label:
            scores[normalized_label] = p["score"]

    text_lower = text.lower()

    # RULE-BASED OVERRIDES
    if any(word in text_lower for word in NEGATIVE_KEYWORDS):
        return {
            "label": "Negative",
            "confidence": round(scores.get("Negative", 0.7), 4)
        }

    if any(word in text_lower for word in POSITIVE_KEYWORDS):
        return {
            "label": "Positive",
            "confidence": round(scores.get("Positive", 0.7), 4)
        }

    # Safe fallback
    if not scores:
        return {"label": "Neutral", "confidence": 0.0}

    best_label = max(scores, key=scores.get)
    return {
        "label": best_label,
        "confidence": round(scores[best_label], 4)
    }