from transformers import BertTokenizer, BertForSequenceClassification
import torch

MODEL_NAME = "bert-base-uncased"

tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
model = BertForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=3  # positive, neutral, negative
)

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

    scores = outputs.logits
    label = torch.argmax(scores, dim=1).item()

    sentiments = ["Negative", "Neutral", "Positive"]
    return sentiments[label]
