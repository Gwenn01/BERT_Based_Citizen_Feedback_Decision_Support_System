from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_NAME = "nlptown/bert-base-multilingual-uncased-sentiment"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

def predict_sentiment(text):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    scores = torch.softmax(outputs.logits, dim=1)[0]
    predicted_class = torch.argmax(scores).item() + 1  # 1–5 stars

    return {
        "stars": predicted_class,
        "confidence": float(scores[predicted_class - 1])
    }
