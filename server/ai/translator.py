from googletrans import Translator

translator = Translator()

def translate_filipino_to_english(text: str) -> str:
    if not text or not text.strip():
        return text

    try:
        result = translator.translate(text, src="tl", dest="en")
        return result.text
    except Exception as e:
        print("Local translation failed:", e)
        return text
