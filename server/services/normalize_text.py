import re

NORMALIZATION_MAP = {
    # Intensifiers
    "sobrang": "very",
    "napaka": "very",
    "napakabait": "very helpful",
    "napakabilis": "very fast",
    
    # Common civic sentiment words
    "bagal": "slow",
    "mabagal": "slow",
    "bilis": "fast",
    "mabilis": "fast",
    "bait": "helpful",
    "maayos": "good",
    "pangit": "bad",
    "ayos": "good",
    
    # Service-related terms
    "serbisyo": "service",
    "tulong": "assistance",
    "staff": "staff",
    "empleyado": "staff",
    
    # Complaints
    "lagi na lang": "always",
    "palaging": "always",
    "hindi maayos": "not good",
    "wala pa rin": "still none"
}

def normalize_text(text: str) -> str:
    text = text.lower()
    
    # Remove excessive punctuation
    text = re.sub(r"[!?.]{2,}", ".", text)
    
    # Normalize Filipino → English sentiment terms
    for fil, norm in NORMALIZATION_MAP.items():
        text = re.sub(rf"\b{fil}\b", norm, text)
    
    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()
    
    return text
