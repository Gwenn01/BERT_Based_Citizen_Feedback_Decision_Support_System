from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

#MODEL_NAME = "nlptown/bert-base-multilingual-uncased-sentiment"
MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment"

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
    stars = torch.argmax(scores).item() + 1
    confidence = float(scores[stars - 1])

    if stars <= 2:
        label = "Negative"
    elif stars == 3:
        label = "Neutral"
    else:
        label = "Positive"

    return {
        "label": label,
        "stars": stars,
        "confidence": confidence
    }
