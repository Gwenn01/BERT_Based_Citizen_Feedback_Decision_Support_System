# import requests
# import os
# import re

# API_URL = "https://api-inference.huggingface.co/models/Gwen01/bert-sentiment-finetuned"
# HF_TOKEN = os.getenv("HF_TOKEN")

# print("DEBUG: HF_TOKEN SET =", bool(HF_TOKEN))

# HEADERS = {
#     "Authorization": f"Bearer {HF_TOKEN}",
#     "Content-Type": "application/json"
# }

# LABEL_MAP = {
#     "label_0": "Negative",
#     "label_1": "Neutral",
#     "label_2": "Positive",
# }

# def normalize_text(text: str) -> str:
#     text = text.lower()
#     text = re.sub(r"http\S+", "", text)
#     text = re.sub(r"@\w+", "", text)
#     text = re.sub(r"#\w+", "", text)
#     text = re.sub(r"[^a-zñ\s]", " ", text)
#     text = re.sub(r"\s+", " ", text).strip()
#     return text

# def predict_sentiment(text: str):
#     clean_text = normalize_text(text)

#     print("\n==============================")
#     print("RAW INPUT TEXT:", text)
#     print("NORMALIZED TEXT:", clean_text)
#     print("API URL:", API_URL)
#     print("HEADERS SENT:", HEADERS)
#     print("PAYLOAD:", {"inputs": clean_text})

#     try:
#         response = requests.post(
#             API_URL,
#             headers=HEADERS,
#             json={"inputs": clean_text},
#             timeout=60
#         )
#     except Exception as e:
#         print(" REQUEST FAILED:", e)
#         return {"label": "Neutral", "confidence": 0.0}

#     print("HTTP STATUS CODE:", response.status_code)
#     print("RAW RESPONSE TEXT:", repr(response.text))

#     # If empty response → router / auth issue
#     if not response.text.strip():
#         print(" EMPTY RESPONSE BODY")
#         return {"label": "Neutral", "confidence": 0.0}

#     try:
#         data = response.json()
#     except Exception as e:
#         print(" JSON PARSE ERROR:", e)
#         return {"label": "Neutral", "confidence": 0.0}

#     print("PARSED JSON:", data)

#     if isinstance(data, dict) and "error" in data:
#         print(" HF API ERROR:", data["error"])
#         return {"label": "Neutral", "confidence": 0.0}

#     # Normalize HF output shape
#     if isinstance(data, list):
#         predictions = data
#     else:
#         predictions = [data]

#     best_label = "Neutral"
#     best_score = 0.0

#     for p in predictions:
#         raw_label = p.get("label", "").lower()
#         score = p.get("score", 0.0)
#         label = LABEL_MAP.get(raw_label)

#         print("PRED ENTRY:", p, "→", label, score)

#         if label and score > best_score:
#             best_label = label
#             best_score = score

#     return {
#         "label": best_label,
#         "confidence": round(best_score, 4)
#     }


#===============================================================================================================================================================
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os
import torch
import re

# =====================================================
# PATH SETUP
# =====================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "bert_sentiment_model")

# =====================================================
# LOAD MODEL
# =====================================================
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

# =====================================================
# LABEL MAP
# =====================================================
LABEL_MAP = {
    0: "Negative",
    1: "Neutral",
    2: "Positive"
}

# =====================================================
# LIGHT NORMALIZATION (SAFE)
# =====================================================
def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zñ\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

# =====================================================
# RULE-BASED SENTIMENT HINTS (TAGALOG / TAGLISH)
# =====================================================
NEGATIVE_HINTS = [
    # Process / system issues
    "magulo",
    "mabagal",
    "sobrang tagal",
    "paulit ulit",
    "hindi maayos",
    "walang malinaw",
    "laging down",
    "hindi nagagamit",

    # Service quality
    "walang pakialam",
    "hindi responsive",
    "pangit ang serbisyo",

    # Frustration expressions
    "nakakainis",
    "sayang ang oras",
    "delay",

    # Bureaucratic burden
    "ang dami ng requirements"
]


POSITIVE_HINTS = [
    # Process quality
    "mabilis",
    "maayos ang proseso",
    "maayos ang daloy",
    "maaga kaming natapos",
    "convenient",
    "napaka convenient",

    # Service quality
    "maganda ang serbisyo",
    "mahusay ang serbisyo",
    "napakabait",
    "matulungin",
    "malaking tulong",

    # Improvements / satisfaction
    "malaking improvement",
    "ramdam ang improvement",
    "satisfied",
    "malinaw ang proseso"
]


# =====================================================
# PREDICT FUNCTION
# =====================================================
def predict_sentiment(text: str):
    original_text = text
    clean_text = normalize_text(text)

    # -----------------------------
    # TOKENIZATION
    # -----------------------------
    inputs = tokenizer(
        clean_text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    # -----------------------------
    # MODEL INFERENCE
    # -----------------------------
    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    probs = torch.softmax(logits, dim=1)[0]

    label_id = torch.argmax(probs).item()
    confidence = probs[label_id].item()
    label = LABEL_MAP[label_id]

    # -----------------------------
    # RULE-BASED CORRECTION
    # -----------------------------
    text_lower = clean_text

    if label == "Positive" and any(w in text_lower for w in NEGATIVE_HINTS):
        label = "Negative"
        confidence *= 0.85

    elif label == "Negative" and any(w in text_lower for w in POSITIVE_HINTS):
        label = "Positive"
        confidence *= 0.85

    # -----------------------------
    # CONFIDENCE SAFETY NET
    # -----------------------------
    if confidence < 0.75:
        label = "Neutral"

    return {
        "label": label,
        "confidence": round(confidence, 4)
    }

