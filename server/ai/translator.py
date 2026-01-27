from deep_translator import GoogleTranslator

def translate_filipino_to_english(text: str) -> str:
    if not text or not text.strip():
        return text

    try:
        translator = GoogleTranslator(source="tl", target="en")
        return translator.translate(text)
    except Exception as e:
        print("Local translation failed:", e)
        return text
