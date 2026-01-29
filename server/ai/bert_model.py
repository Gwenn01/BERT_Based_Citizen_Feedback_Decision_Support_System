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
#tagalog normalization
TAGALOG_NORMALIZATION_MAP = {
    # Negations
    "hinde": "hindi",
    "nde": "hindi",
    "di": "hindi",

    # Common contractions / slang
    "kase": "kasi",
    "kc": "kasi",
    "lang": "lamang",
    "lng": "lamang",

    # Service-related terms
    "pakikitungo": "pakikitungo",  # keep consistent
    "ugali": "ugali",

    # Emphasis words (optional)
    "sobrang": "napaka",
    "super": "napaka",

    # Informal fillers (optional)
    "po": "po",
    "opo": "po"
}
# =====================================================
# LIGHT NORMALIZATION (SAFE)
# =====================================================

def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zñ\s]", " ", text)

    # normalize spacing
    text = re.sub(r"\s+", " ", text).strip()

    # Tagalog normalization
    words = text.split()
    normalized_words = [
        TAGALOG_NORMALIZATION_MAP.get(word, word)
        for word in words
    ]

    return " ".join(normalized_words)

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
    #adtional
    "masungit",
    "suplado",
    "bastos",
    "hindi maayos ang pakikitungo",
    "pangit ang pakikitungo",
    "masama ang ugali",
    "walang galang",
    "hindi magalang"
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

NEUTRAL_HINTS = [
    # Explicit neutrality
    "no comments",
    "no comment",
    "wala naman akong reklamo",
    "walang reklamo",
    "wala akong reklamo",
    "walang complaint",
    "wala namang reklamo",

    # Indifference / nothing to add
    "wala lang",
    "okay lang",
    "sakto lang",
    "pwede na",

    # English/Taglish
    "nothing to say",
    "no issues",
    "no problem"
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

    has_negative = any(w in text_lower for w in NEGATIVE_HINTS)
    has_positive = any(w in text_lower for w in POSITIVE_HINTS)
    has_neutral  = any(w in text_lower for w in NEUTRAL_HINTS)

    # 1️ Explicit neutrality (no praise, no complaint)
    if has_neutral and not has_negative and not has_positive:
        label = "Neutral"
        confidence = max(confidence, 0.80)

    # 2️ Override BERT if it contradicts strong hints
    elif label == "Positive" and has_negative:
        label = "Negative"
        confidence *= 0.85

    elif label == "Negative" and has_positive:
        label = "Positive"
        confidence *= 0.85

    # 3️ Low-confidence safety net (SMART version)
    if confidence < 0.75:
        if has_negative:
            label = "Negative"
        elif has_positive:
            label = "Positive"
        else:
            label = "Neutral"

    return {
        "label": label,
        "confidence": round(confidence, 4)
    }


